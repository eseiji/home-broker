import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument, OrderStatus, OrderType } from './entities/order.entity';
import mongoose, { Model } from 'mongoose';
import { Asset } from 'src/assets/entities/asset.entity';
import { CreateTradeDto } from './dto/create-trade.dto';
import { AssetDocument } from 'src/assets/entities/asset.entity';
import { Trade } from './entities/trade.entity';
import { AssetDaily } from 'src/assets/entities/asset-daily.entity';
import { WalletAsset } from 'src/wallets/entities/wallet-asset.entity';
import { Wallet, WalletDocument } from 'src/wallets/entities/wallet.entity';
import * as kafka from '@confluentinc/kafka-javascript'

@Injectable()
export class OrdersService implements OnModuleInit {

  private kafkaProducer: kafka.KafkaJS.Producer;

  constructor(@InjectModel(Order.name) private orderSchema: Model<Order>, @InjectConnection() private connection: mongoose.Connection,
    @InjectModel(Trade.name) private tradeSchema: Model<Trade>,
    @InjectModel(Asset.name) private assetSchema: Model<Asset>,
    @InjectModel(AssetDaily.name) private assetDailySchema: Model<AssetDaily>,
    @InjectModel(WalletAsset.name) private walletAssetSchema: Model<WalletAsset>,
    @InjectModel(Wallet.name) private walletSchema: Model<Wallet>,
    private kafkaInstance: kafka.KafkaJS.Kafka) { }

  async onModuleInit() {
    this.kafkaProducer = this.kafkaInstance.producer();
    await this.kafkaProducer.connect()
  }

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderSchema.create({
      wallet: createOrderDto.walletId,
      asset: createOrderDto.assetId,
      shares: createOrderDto.shares,
      partial: createOrderDto.shares,
      price: createOrderDto.price,
      type: createOrderDto.type,
      status: OrderStatus.PENDING,
    });

    await this.kafkaProducer.send({
      topic: 'input',
      messages: [
        {
          key: order._id,
          value: JSON.stringify({
            order_id: order._id,
            investor_id: order.wallet,
            asset_id: order.asset,
            shares: order.shares,
            price: order.price,
            order_type: order.type,
          })
        }
      ]
    })

    return order;
  }

  findAll(filter: { walletId: string }) {
    return this.orderSchema
      .find({
        wallet: filter.walletId,
      })
      .populate(['asset']) as Promise<(Order & { asset: Asset })[]>;
  }

  findOne(id: string) {
    return this.orderSchema.findById(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async createTrade(createTradeDto: CreateTradeDto) {
    const session = await this.connection.startSession();
    await session.startTransaction();
    try {
      const order = (await this.orderSchema
        .findById(createTradeDto.orderId)
        .session(session)) as OrderDocument & { trades: string[] };
      if (!order) {
        throw new Error('Order not found');
      }
      const tradeDocs = await this.tradeSchema.create(
        [
          {
            broker_trade_id: createTradeDto.brokerTradeId,
            related_investor_id: createTradeDto.relatedInvestorId,
            shares: createTradeDto.shares,
            price: createTradeDto.price,
            order: order._id,
          },
        ],
        { session },
      );
      const trade = tradeDocs[0];

      order.partial -= createTradeDto.shares;
      order.status = createTradeDto.status;
      order.trades.push(trade._id);
      await order.save({ session });

      if (createTradeDto.status === OrderStatus.CLOSED && order.type === OrderType.BUY) {
        const asset = (await this.assetSchema
          .findById(order.asset)
          .session(session)) as AssetDocument;
        if (asset!.updatedAt < createTradeDto.date) {
          asset!.price = createTradeDto.price.toString();
          await asset!.save({ session });
        }
        const assetDaily = await this.assetDailySchema
          .findOne({
            asset: order.asset,
            date: createTradeDto.date,
          })
          .session(session);
        if (!assetDaily) {
          await this.assetDailySchema.create(
            [
              {
                asset: order.asset,
                date: createTradeDto.date,
                price: createTradeDto.price,
              },
            ],
            { session },
          );
        }
      }

      if (createTradeDto.status === OrderStatus.CLOSED) {
        const walletAsset = await this.walletAssetSchema
          .findOne({
            wallet: order.wallet,
            asset: order.asset,
          })
          .session(session);

        if (!walletAsset && order.type === OrderType.SELL) {
          throw new Error('Asset not found in wallet');
        }

        if (walletAsset) {
          walletAsset.shares +=
            order.type === OrderType.BUY ? createTradeDto.shares : -createTradeDto.shares;
          await walletAsset.save({ session });
        } else {
          const walletAssetDocs = await this.walletAssetSchema.create(
            [
              {
                wallet: order.wallet,
                asset: order.asset,
                shares: createTradeDto.shares,
              },
            ],
            { session },
          );
          const walletAsset = walletAssetDocs[0];
          const wallet = (await this.walletSchema.findById(
            order.wallet,
          )) as WalletDocument & { assets: string[] };
          wallet.assets.push(walletAsset._id);
          await wallet.save({ session });
        }
      }

      await session.commitTransaction();
      return order;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }

  }
}

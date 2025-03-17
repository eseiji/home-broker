import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Wallet } from './entities/wallet.entity';
import mongoose, { Model } from 'mongoose';
import { CreateWalletAssetDto } from './dto/create-wallet-asset.dto';
import { WalletAsset } from './entities/wallet-asset.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private walletSchema: Model<Wallet>,
    @InjectModel(WalletAsset.name)
    private walletAssetSchema: Model<WalletAsset>,
    @InjectConnection() private connection: mongoose.Connection,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return this.walletSchema.create(createWalletDto);
  }

  findAll() {
    return this.walletSchema.find();
  }

  findOne(id: string) {
    return this.walletSchema.findById(id).populate([
      {
        // walletAsset
        path: 'assets',
        populate: ['asset'],
      },
    ]);
  }

  update(id: string, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: string) {
    return `This action removes a #${id} wallet`;
  }

  async createWalletAsset(
    id: string,
    createWalletAssetDto: CreateWalletAssetDto,
  ) {
    const session = await this.connection.startSession();

    session.startTransaction();

    try {
      const { assetId, shares } = createWalletAssetDto;

      const documents = await this.walletAssetSchema.create(
        [
          {
            shares: shares,
            asset: assetId,
            wallet: id,
          },
        ],
        { session },
      );

      const walletAsset = documents[0];

      await this.walletSchema.updateOne(
        {
          _id: id,
        },
        {
          $push: { assets: walletAsset._id },
        },
        { session },
      );

      await session.commitTransaction();

      return walletAsset;
    } catch (error) {
      console.log('error', error);
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}

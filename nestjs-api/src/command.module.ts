import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './assets/assets.module';
import { WalletsModule } from './wallets/wallets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import {
  ConfirmGenerateOrders,
  ConfirmGenerateOrdersClosed,
  SimulateTransactionsCommand,
} from './simulate-transactions.command';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@localhost:27017/nest?authSource=admin',
    ),
    AssetsModule,
    WalletsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SimulateTransactionsCommand,
    ConfirmGenerateOrders,
    ConfirmGenerateOrdersClosed,
  ],
})
export class CommandModule { }
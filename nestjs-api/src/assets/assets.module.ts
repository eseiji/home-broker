import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './entities/asset.entity';
import { AssetsGateway } from './assets.gateway';
import { AssetDailiesService } from './asset-dailies.service';
import { AssetsDailiesController } from './asset-dailies.controller';
import { AssetDaily, AssetDailySchema } from './entities/asset-daily.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Asset.name,
        schema: AssetSchema,
      },
      { name: AssetDaily.name, schema: AssetDailySchema },
    ]),
  ],
  controllers: [AssetsController, AssetsDailiesController],
  providers: [AssetsService, AssetsGateway, AssetDailiesService],
  exports: [AssetsService],
})
export class AssetsModule { }

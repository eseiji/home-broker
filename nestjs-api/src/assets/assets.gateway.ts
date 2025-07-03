import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { AssetsService } from './assets.service';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { AssetPresenter } from './asset.presenter';
import { AssetDailiesService } from './asset-dailies.service';
import { AssetDailyPresenter } from './asset-daily.presenter';

@WebSocketGateway({ cors: true })
export class AssetsGateway implements OnGatewayInit {
  logger = new Logger(AssetsGateway.name);

  constructor(
    private assetsService: AssetsService,
    private assetsDailiesService: AssetDailiesService,
  ) { }

  afterInit(server: Server) {
    this.assetsService.subscribeEvents().subscribe((asset) => {
      server
        .to(asset.symbol)
        .emit('assets/price-updated', new AssetPresenter(asset).toJSON());
    });

    this.assetsDailiesService
      .subscribeCreatedEvents()
      .subscribe((assetDaily) => {
        server
          .to(assetDaily.asset.symbol)
          .emit(
            'assets-daily/created',
            new AssetDailyPresenter(assetDaily).toJSON(),
          );
      });
  }

  @SubscribeMessage('joinAssets')
  handleJoinAssets(client: Socket, payload: { symbols: string[] }) {
    if (!payload.symbols.length) return;

    payload.symbols.forEach((symbol) => client.join(symbol));
    this.logger.log('Client joined assets');
  }

  @SubscribeMessage('joinAsset')
  handleJoinAsset(client: Socket, payload: { symbol: string }) {
    client.join(payload.symbol);
    this.logger.log('Client joined asset');
  }

  @SubscribeMessage('leaveAssets')
  handleLeaveAssets(client: Socket, payload: { symbols: string[] }) {
    if (!payload.symbols.length) return;

    payload.symbols.forEach((symbol) => client.leave(symbol));
    this.logger.log('Client left assets');
  }

  @SubscribeMessage('leaveAsset')
  handleLeaveAsset(client: Socket, payload: { symbol: string }) {
    client.leave(payload.symbol);
    this.logger.log('Client left asset');
  }
}

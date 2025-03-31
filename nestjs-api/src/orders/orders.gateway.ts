import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@WebSocketGateway({ cors: true })
export class OrdersGateway {
  constructor(private ordersService: OrdersService) {}

  @SubscribeMessage('orders/create')
  async handleMessage(client: any, payload: CreateOrderDto) {
    console.log('payload', payload);
    try {
      const order = await this.ordersService.create(payload);
      console.log('order', order);

      return order;
    } catch (error) {
      console.log('error', error);
    }
  }
}

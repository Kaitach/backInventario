import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server,  } from 'socket.io';

@WebSocketGateway(81, {
  cors: { origin: '*' },
})
export class inventoryGatwey
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit() {
    console.log('Esto se ejecuta cuando inicia')
  }

  handleConnection() {
    console.log('Hola alguien se conecto al socket 👌👌👌');
  }

  handleDisconnect() {
    console.log('usuario desconectado')
  }




  @RabbitSubscribe({
    exchange: 'productInventory',
    routingKey: 'productRegister',
  })
  registerProduct(payload: any) {
  
    try {
      this.server.emit('productRegister', payload);
      console.log('Evento emitido correctamente');
    } catch (error) {
      console.error('Error al emitir el evento:', error);
    }
  }
  @RabbitSubscribe({
    exchange: 'productInventory',
    routingKey: 'newProductReSeller',
  })
  reSellerSale(
    payload: any
  ) {

    try {
      this.server.emit('newProductReSeller', payload);
      console.log('Evento emitido correctamente');
    } catch (error) {
      console.error('Error al emitir el evento:', error);
    }
  }
  @RabbitSubscribe({
    exchange: 'productInventory',
    routingKey: 'new.productInventory',
  })
  addInventory(
    payload: any
    ) {
  
      try {
        this.server.emit('newproductInventory', payload);
      console.log('Evento emitido correctamente');
    } catch (error) {
      console.error('Error al emitir el evento:', error);
    }
  }
  @RabbitSubscribe({
    exchange: 'productInventory',
    routingKey: 'new.product.customerSale',
  })
  customerSale(
    payload: any
    ) {
  
      try {
        this.server.emit('new.product.customerSale', payload);
      console.log('Evento emitido correctamente');
    } catch (error) {
      console.error('Error al emitir el evento:', error);
    }
  }
    
}
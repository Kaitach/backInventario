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
    const branchId = JSON.parse(payload)

    try {
      this.server.emit(`productRegister_${branchId.branchId}`, payload);
      console.log('Evento emitido correctamente de producto registrado ');
    } catch (error) {
      console.error('Error al emitir el evento:', error);
    }
  }


  
  @RabbitSubscribe({
    exchange: 'productInventory',
    routingKey: 'productreturn',

  })
  productreturn(
    payload: any
  ) {
    const branchId = JSON.parse(payload)

      try {
        console.log('va el evento' + payload)
        this.server.emit(`saleEvent_${branchId.branchId}`, payload);

      console.log('Evento emitido correctamente doble evento ');
      this.server.emit(`productRegister_${branchId.branchId}`, payload);
      console.log('Evento emitido correctamente doble evento ');
      console.log('va el evento' + payload)

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
    const branchId = JSON.parse(payload)

      try {
        console.log('va el evento' + payload)
        this.server.emit(`productRegister_${branchId.branchId}`, payload);
        this.server.emit(`saleEvent_${branchId.branchId}`, payload);

      console.log('Evento emitido correctamente de venta de reseller');
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
      const branchId = JSON.parse(payload)

      try {

        this.server.emit(`productRegister_${branchId.branchId}`, payload);
        
      console.log('Evento emitido agragamos productos');
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
  
      const branchId = JSON.parse(payload)

      try {
        this.server.emit(`productRegister_${branchId.branchId}`, payload);
        console.log('Evento emitido correctamente');

        this.server.emit(`saleEvente_${branchId.branchId}`, payload);
        console.log('va el evento' + payload)

    } catch (error) {
      console.error('Error al emitir el evento:', error);
    }
  }
    
}
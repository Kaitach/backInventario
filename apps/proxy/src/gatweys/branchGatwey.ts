import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {

  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server,  } from 'socket.io';

@WebSocketGateway(81, {
  cors: { origin: '*' },
})
export class userGatwey

{
  @WebSocketServer() server: Server;






  @RabbitSubscribe({
    exchange: 'branch',
    routingKey: 'BranchRegister',

  })
  registerProduct(payload: any) {
  
    try {
      
      this.server.emit(`branchRegister`, payload);
      console.log('Evento emitido correctamente');
            console.log('Evento emitido correctamente' +  JSON.parse(payload));

    } catch (error) {
      console.error('Error al emitir el evento:', error);
    }
  }
  @RabbitSubscribe({
    exchange: 'branch',
    routingKey: 'saleEvent',

  })
  registerSale(payload: any) {
    const branchId = JSON.parse(payload)

    try {

      this.server.emit(`saleEvent_${branchId.branchId}`, payload);
      console.log('Evento emitido correctamente por?');
    } catch (error) {
      console.error('Error al emitir el evento:', error);
    }
  }
  }

    

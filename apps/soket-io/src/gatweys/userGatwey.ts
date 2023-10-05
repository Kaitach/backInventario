import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {

  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server,  } from 'socket.io';

@WebSocketGateway(81, {
  cors: { origin: '*' },
})
export class branchGatwey

{
  @WebSocketServer() server: Server;






  @RabbitSubscribe({
    exchange: 'user',
    routingKey: 'new.User',
  })
  registerProduct(payload: any) {
  
    try {
      this.server.emit('branchRegister', payload);
      console.log('Evento emitido correctamente');
    } catch (error) {
      console.error('Error al emitir el evento:', error);
    }
  }
  }

    

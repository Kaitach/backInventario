import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { registeruserUseCase } from '../../aplication/useCase/userRegister';
import { userRepository } from '../database/mongoDB';

@Injectable()
export class BranchHandler {
  constructor(private readonly userRegister: userRepository) {}
  
    useCase= new registeruserUseCase(this.userRegister );
  
  @RabbitSubscribe({
    exchange: 'user',
    routingKey: 'new.User',
    queue: 'authUser'
  })
  newBranch(message: any) {
    try {
      const parsedMessage = JSON.parse(message);
      console.log('Mensaje recibido:', parsedMessage);

      this.useCase.execute(parsedMessage);
    } catch (error) {
      console.error('Error al procesar el mensaje:', error);
    }
  }
}

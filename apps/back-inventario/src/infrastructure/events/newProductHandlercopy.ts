/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { newProductInventoryCommand } from '../../domain/events/commands/newProductInvetory';
import { EventRepository } from '../database/mongoDB/repository/eventRepository';
import { CreateEventDto } from '../utils/dto/eventDto';
import { IProductEntity, newProductCommand } from '../../domain';
import { RegisterProductDTO } from '../utils';

@CommandHandler(newProductCommand)
export class newProductHandler
  implements ICommandHandler<newProductCommand>
{
  constructor(
    private readonly repository: EventRepository,
    @Inject('inventory') private client: ClientProxy,
  ) {  
}

  createEventFromCommand(command: IProductEntity): void {

    const nameEvent = 'create product';
    const eventAggregateId = command.branchId
    const eventDataAsString = JSON.stringify(command);
    const createEventDto = new CreateEventDto(
      eventDataAsString,
      nameEvent,
      eventAggregateId,
    );
    console.log(eventDataAsString);
    this.client.emit('create product', command as RegisterProductDTO);

    try {
      this.repository.create(createEventDto);
      console.log('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  }

  execute(command: newProductInventoryCommand): void {
    
    this.createEventFromCommand(
      command.productEntity,
    );
    console.log(new Date());
    console.log('Command executed successfully');
  }
}

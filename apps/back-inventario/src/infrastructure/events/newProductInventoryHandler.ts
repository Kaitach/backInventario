/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { newProductInventoryCommand } from '../../domain/events/commands/newProductInvetory';
import { EventRepository } from '../database/mongoDB/repository/eventRepository';
import { CreateEventDto } from '../utils/dto/eventDto';
import { IProductEntity } from '../../domain';
import { RegisterquantityDTO } from 'apps/persistence/src';

@CommandHandler(newProductInventoryCommand)
export class newProductInventoryHandler
  implements ICommandHandler<newProductInventoryCommand>
{
  constructor(
    private readonly repository: EventRepository,
    @Inject('inventory') private client: ClientProxy,
  ) {  
}

  createEventFromCommand(command: IProductEntity): void {

    const nameEvent = 'new product inventory';
    const eventAggregateId = command.branchId
    console.log(eventAggregateId)
    const eventDataAsString = JSON.stringify(command);
    const createEventDto = new CreateEventDto(
      eventDataAsString,
      nameEvent,
      eventAggregateId,
    );
    this.client.emit('new product inventory', command as  RegisterquantityDTO) ;

    try {
      this.repository.create(createEventDto);
      console.log('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  }

  execute(command: newProductInventoryCommand): void {
     console.log(command) 
    this.createEventFromCommand(
      command.productEntity,
    );
    console.log( command.productEntity) 

    console.log(new Date());
    console.log('Command executed successfully');
  }
}

/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { newProductInventoryCommand } from '../../domain/events/commands/newProductInvetory';
import { EventRepository } from '../database/mongoDB/repository/eventRepository';
import { CreateEventDto } from '../utils/dto/eventDto';

@CommandHandler(newProductInventoryCommand)
export class newProductInventoryHandler
  implements ICommandHandler<newProductInventoryCommand>
{
  constructor(
    private readonly repository: EventRepository,
    @Inject('inventory') private client: ClientProxy,
  ) {}

  createEventFromCommand(command, aggregateID): void {
    const nameEvent = 'new product inventory';
    const eventDataAsString = JSON.stringify(command);
    const createEventDto = new CreateEventDto(
      eventDataAsString,
      nameEvent,
      aggregateID,
    );
    this.client.emit('new product add inventory', eventDataAsString);

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
      command.productEntity.branchId,
    );
    console.log(new Date());
    console.log('Command executed successfully');
  }
}

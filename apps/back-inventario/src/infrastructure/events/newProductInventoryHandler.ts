/* eslint-disable prettier/prettier */
import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import { EventRepository } from '../database/mongoDB/repository/eventRepository';
import { CreateEventDto } from '../utils/dto/eventDto';
import { newProductInventoryCommand } from '../../domain/events/commands/newProductInvetory';

@CommandHandler(newProductInventoryCommand)
export class newProductInventoryHandler implements ICommandHandler<newProductInventoryCommand> {
  constructor(private readonly eventBus: EventBus, private readonly repository: EventRepository) {}

  createEventFromCommand(command,aggregateID): void {
    const nameEvent = "new product inventory";
    const eventDataAsString = JSON.stringify(command);
    const createEventDto = new CreateEventDto(eventDataAsString, nameEvent,aggregateID);

    try {
      this.repository.create(createEventDto);
      console.log('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  }

  execute(command: newProductInventoryCommand): void {

    this.createEventFromCommand(command.productEntity, command.productEntity.branchId);
    console.log(new Date())
    console.log('Command executed successfully');
  }
}


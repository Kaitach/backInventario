/* eslint-disable prettier/prettier */
import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import { EventRepository } from '../database/mongoDB/repository/eventRepository';
import { CreateEventDto } from '../utils/dto/eventDto';
import { newProductCommand } from '../../domain/events/commands/newProductCommand';

@CommandHandler(newProductCommand)
export class newProductHandler implements ICommandHandler<newProductCommand> {
  constructor(private readonly eventBus: EventBus, private readonly repository: EventRepository) {}

  createEventFromCommand(command): void {
    const nameEvent = "Create  Product"
    const eventDataAsString = JSON.stringify(command);
    const createEventDto = new CreateEventDto(eventDataAsString, nameEvent);

    try {
      this.repository.create(createEventDto);
      console.log('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  }

  execute(command: newProductCommand): void {

    this.createEventFromCommand(command.productEntity);
    console.log(new Date())
    console.log('Command executed successfully');
  }
}


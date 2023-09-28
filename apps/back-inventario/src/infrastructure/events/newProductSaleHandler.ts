/* eslint-disable prettier/prettier */
import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import { EventRepository } from '../database/mongoDB/repository/eventRepository';
import { CreateEventDto } from '../utils/dto/eventDto';
import { newProductSalecommand } from '../../domain/events/commands/newProdcutSaleCommand';

@CommandHandler(newProductSalecommand)
export class NewProductSaleHandler implements ICommandHandler<newProductSalecommand> {
  constructor(private readonly eventBus: EventBus, private readonly repository: EventRepository) {}

  createEventFromCommand(command): void {
    const nameEvent = "new product sale "
    const eventDataAsString = JSON.stringify(command);
    const createEventDto = new CreateEventDto(eventDataAsString, nameEvent);

    try {
      this.repository.create(createEventDto);
      console.log('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  }

  execute(command: newProductSalecommand): void {
    this.createEventFromCommand(command.productEntity);
    console.log(new Date())
    console.log('Command executed successfully');
  }
}


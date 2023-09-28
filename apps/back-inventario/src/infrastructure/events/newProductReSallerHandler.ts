/* eslint-disable prettier/prettier */
import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import { EventRepository } from '../database/mongoDB/repository/eventRepository';
import { CreateEventDto } from '../utils/dto/eventDto';
import { newProductSaleReSellerCommand } from '../../domain/events/commands/newProductSaleReSellerCommand';

@CommandHandler(newProductSaleReSellerCommand)
export class newProductReSellerHandler implements ICommandHandler<newProductSaleReSellerCommand> {
  constructor(private readonly eventBus: EventBus, private readonly repository: EventRepository) {}

  createEventFromCommand(command): void {
    const nameEvent = "new prodct re seller"
    const eventDataAsString = JSON.stringify(command);
    const createEventDto = new CreateEventDto(eventDataAsString, nameEvent);

    try {
      this.repository.create(createEventDto);
      console.log('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  }

  execute(command: newProductSaleReSellerCommand): void {
    this.createEventFromCommand(command.productEntity);
    console.log(new Date())
    console.log('Command executed successfully');
  }
}


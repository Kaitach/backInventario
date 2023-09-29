/* eslint-disable prettier/prettier */
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { newProductCommand } from '../../domain/events/commands/';
import { EventRepository } from '../database/mongoDB/repository/eventRepository';
import { CreateEventDto } from '../utils/dto/eventDto';

@CommandHandler(newProductCommand)
export class newProductHandler implements ICommandHandler<newProductCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly repository: EventRepository,
  ) {}

  createEventFromCommand(command, aggregateID): void {
    console.log(command, aggregateID);
    const nameEvent = 'Create  Product';
    const eventDataAsString = JSON.stringify(command);
    const createEventDto = new CreateEventDto(
      eventDataAsString,
      nameEvent,
      aggregateID,
    );

    try {
      this.repository.create(createEventDto);
      console.log('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  }

  execute(command: newProductCommand): void {
    this.createEventFromCommand(
      command.productEntity,
      command.productEntity.branchId,
    );
    console.log(new Date());
    console.log('Command executed successfully');
  }
}

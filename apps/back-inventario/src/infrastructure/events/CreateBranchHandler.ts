/* eslint-disable prettier/prettier */
import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import { CreateBranchCommand } from '../../domain/events/commands/newBranchCommand';
import { EventRepository } from '../database/mongoDB/repository/eventRepository';
import { CreateEventDto } from '../utils/dto/eventDto';
import { CreatedEvent } from '../../domain/events/subscribers/branch/newBranchSubscriber';

@CommandHandler(CreateBranchCommand)
export class CreateBranchHandler implements ICommandHandler<CreateBranchCommand> {
  constructor(private readonly eventBus: EventBus, private readonly repository: EventRepository) {}

  createEventFromCommand(command): void {
    const nameEvent = command.constructor.name;
    const eventDataAsString = JSON.stringify(command);
    const createEventDto = new CreateEventDto(eventDataAsString, nameEvent);

    try {
      this.repository.create(createEventDto);
      console.log('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  }

  execute(command: CreateBranchCommand): void {
    const branchCreatedEvent = new CreatedEvent(command.branchData);
    this.eventBus.publish(branchCreatedEvent);

    this.createEventFromCommand(command.branchData);
    console.log(new Date())
    console.log('Command executed successfully');
  }
}


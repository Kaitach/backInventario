/* eslint-disable prettier/prettier */
import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs'
import { EventRepository } from '../database/mongoDB/repository/eventRepository';
import { CreateEventDto } from '../utils/dto/eventDto';
import { CreatedEvent } from '../../domain/events/subscribers/branch/newBranchSubscriber';
import { CreateUserCommand } from '../../domain/events/commands/newUserCommand';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
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

  execute(command: CreateUserCommand): void {
    const UserCreatedEvent = new CreatedEvent(command.userData);
    this.eventBus.publish(UserCreatedEvent);

    this.createEventFromCommand(command.userData);
    console.log(new Date())
    console.log('Command executed successfully');
  }
}


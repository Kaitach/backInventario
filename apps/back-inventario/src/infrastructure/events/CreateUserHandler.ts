/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserCommand } from '../../domain/events/commands/newUserCommand';
import { EventRepository } from '../database/mongoDB/repository/eventRepository';
import { CreateEventDto } from '../utils/dto/eventDto';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly repository: EventRepository,
    @Inject('inventory') private client: ClientProxy,
  ) {}

  createEventFromCommand(command, idBranch): void {
    const nameEvent = 'Create  User';
    const eventDataAsString = JSON.stringify(command);
    this.client.emit('create user', eventDataAsString);
    console.log(command, idBranch)
    const createEventDto = new CreateEventDto(
      eventDataAsString,
      nameEvent,
      idBranch,
    );

    try {
      this.repository.create(createEventDto);
      console.log('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  }

  execute(command: CreateUserCommand): void {
    this.createEventFromCommand(command.userData, command.userData.branchId);
    console.log(new Date());
    console.log('Command executed successfully');
  }
}

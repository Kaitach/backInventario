/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBranchCommand } from '../../domain/events/commands/newBranchCommand';
import { EventRepository } from '../database/mongoDB/repository/eventRepository';
import { CreateEventDto } from '../utils/dto/eventDto';
@CommandHandler(CreateBranchCommand)
export class CreateBranchHandler
  implements ICommandHandler<CreateBranchCommand>
{
  constructor(
    private readonly repository: EventRepository,
    @Inject('inventory') private client: ClientProxy,
  ) {}

  createEventFromCommand(command, aggregateID): void {
    const nameEvent = 'Create Branch';
    const eventDataAsString = JSON.stringify(command);
    this.client.emit('create branch', eventDataAsString);
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

  execute(command: CreateBranchCommand): void {
    console.log('Executing command:', command);
    this.createEventFromCommand(
      command.branchData,
      command.branchData.branchId,
    );
    console.log(new Date());
    console.log('Command executed successfully');
  }
}

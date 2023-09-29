/* eslint-disable prettier/prettier */
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateBranchCommand } from '../../domain/events/commands/newBranchCommand';
import { EventRepository } from '../database/mongoDB/repository/eventRepository';
import { CreateEventDto } from '../utils/dto/eventDto';

@CommandHandler(CreateBranchCommand)
export class CreateBranchHandler
  implements ICommandHandler<CreateBranchCommand>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly repository: EventRepository,
  ) {}

  createEventFromCommand(command, aggregateID): void {
    const nameEvent = 'Create Branch';
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

  execute(command: CreateBranchCommand): void {
    console.log('Executing command:', command)
    this.createEventFromCommand(command.branchData, command.branchData.branchId);
    console.log(new Date());
    console.log('Command executed successfully');
  }
}

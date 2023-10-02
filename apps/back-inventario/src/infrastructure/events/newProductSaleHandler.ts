/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { newProductSalecommand } from '../../domain/events/commands/newProdcutSaleCommand';
import { EventRepository } from '../database/mongoDB/repository/eventRepository';
import { CreateEventDto } from '../utils/dto/eventDto';

@CommandHandler(newProductSalecommand)
export class NewProductSaleHandler
  implements ICommandHandler<newProductSalecommand>
{
  constructor(
    private readonly repository: EventRepository,
    @Inject('inventory') private client: ClientProxy,
  ) {}

  createEventFromCommand(command, idbranch): void {
    const nameEvent = 'new product sale ';
    const eventDataAsString = JSON.stringify(command);
    const createEventDto = new CreateEventDto(
      eventDataAsString,
      nameEvent,
      idbranch,
    );
    this.client.emit('new product sale', eventDataAsString);

    try {
      this.repository.create(createEventDto);
      console.log('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  }

  execute(command: newProductSalecommand): void {
    this.createEventFromCommand(
      command.productEntity,
      command.productEntity.branchId,
    );
    console.log(new Date());
    console.log('Command executed successfully');
  }
}

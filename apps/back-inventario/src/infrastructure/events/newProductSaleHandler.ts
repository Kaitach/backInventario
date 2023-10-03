/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { newProductSalecommand } from '../../domain/events/commands/newProdcutSaleCommand';
import { EventRepository } from '../database/mongoDB/repository/eventRepository';
import { CreateEventDto } from '../utils/dto/eventDto';
import { RegisterquantityDTO } from '../utils';
import { blue } from 'colorette';

@CommandHandler(newProductSalecommand)
export class NewProductSaleHandler
  implements ICommandHandler<newProductSalecommand>
{
  constructor(
    private readonly repository: EventRepository,
    @Inject('inventory') private client: ClientProxy,
  ) {}

  createEventFromCommand(command): void {
    console.log(blue('data'))
    const eventAggregateId = command.branchId

    console.log(command)
    console.log(blue('data'))

    const nameEvent = 'new product sale ';
    const eventDataAsString = JSON.stringify(command);
    const createEventDto = new CreateEventDto(
      eventDataAsString,
      nameEvent,
      eventAggregateId,
    );
    this.client.emit('new product sale', command as  RegisterquantityDTO) ;

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
    );
    console.log(new Date());
    console.log('Command executed successfully');
  }
}

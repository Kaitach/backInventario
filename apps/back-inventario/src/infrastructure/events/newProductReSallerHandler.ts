/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { newProductSaleReSellerCommand } from '../../domain/events/commands/newProductSaleReSellerCommand';
import { EventRepository } from '../database/mongoDB/repository/eventRepository';
import { CreateEventDto } from '../utils/dto/eventDto';

@CommandHandler(newProductSaleReSellerCommand)
export class newProductReSellerHandler
  implements ICommandHandler<newProductSaleReSellerCommand>
{
  constructor(
    private readonly repository: EventRepository,
    @Inject('inventory') private client: ClientProxy,
  ) {}

  createEventFromCommand(command, aggregateID): void {
    console.log(command, aggregateID);
    const nameEvent = 'Create  Product';
    const eventDataAsString = JSON.stringify(command);
    this.client.emit('new product re seller', eventDataAsString);

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

  execute(command: newProductSaleReSellerCommand): void {
    this.createEventFromCommand(
      command.productEntity,
      command.productEntity.branchId,
    );
    console.log(new Date());
    console.log('Command executed successfully');
  }
}

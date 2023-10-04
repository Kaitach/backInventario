import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { CommandBus } from 'apps/back-inventario/src/domain';
import { EventRepository } from '../../database';
import { CreateEventDto } from '../../utils';

@Injectable()
export class MessagingService  implements CommandBus{
  constructor(private readonly amqpConnection: AmqpConnection,    private readonly repository: EventRepository,
    ) {}
    execute(exchange: string, routeingKey: string, data: any) {
        this.amqpConnection.publish(exchange, routeingKey, data);
        console.log(exchange + ' ' + routeingKey + ' ' + data);
        const eventDataAsString = JSON.stringify(data);
        const createEventDto = new CreateEventDto(
          eventDataAsString,
          routeingKey,
          '',
        );
        this.repository.create(createEventDto);

    }

 

 
}
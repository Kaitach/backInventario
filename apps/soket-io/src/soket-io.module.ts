import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { inventoryGatwey } from './gatweys/inventoryGatwey.service';
import { SoketIoController } from './soket-io.controller';
import {  userGatwey } from './gatweys/branchGatwey';
import { branchGatwey } from './gatweys/userGatwey';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'invetory.sofka1',
          type: 'topic',
        },
        {
          name: 'productInventory',
          type: 'topic',
        },
        {
          name: 'user',
          type: 'topic',
        },
        {
          name: 'branch',
          type: 'topic',
        },
      ],
      uri: 'amqp://127.0.0.1:5672',
    }),
  ],
  controllers: [SoketIoController],
  providers: [inventoryGatwey, branchGatwey, userGatwey],
})
export class SoketIoModule {}

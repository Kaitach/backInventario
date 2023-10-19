import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { inventoryGatwey } from './gatweys/inventoryGatwey.service';
import {  userGatwey } from './gatweys/branchGatwey';
import { branchGatwey } from './gatweys/userGatwey';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
  }),
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
      uri: process.env.RABBITURL ,
    }),
  ],
  controllers: [],
  providers: [inventoryGatwey, branchGatwey, userGatwey],
})
export class SoketIoModule {}

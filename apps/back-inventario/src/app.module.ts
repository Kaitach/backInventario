import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
/* eslint-disable prettier/prettier */
import { ProductController } from './infrastructure/controller/product.controller';
import { BranchController } from './infrastructure/controller/branch.controller';
import { UserController } from './infrastructure/controller/user.controller';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventRepository } from './infrastructure';

import { DatabaseModule } from './infrastructure/database/database.module';
import { infrastructureServiceProduct } from './infrastructure/service/infrastructure.service';
import { userServiceIntrastructure } from './infrastructure/service/infrastructureUser.service';
import { infrastuctureBranchService } from './infrastructure/service/infrastructureBranch.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MessagingService } from './infrastructure/events/service/serviceEvent';

@Module({
  imports: [DatabaseModule,
    CqrsModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [ 
      
        {
          name: 'invetory.sofka1',
          type: 'topic',
        } 
        , { 
          name : 'productInventory' , 
          type : 'topic' 
          
        }  , { 
          name : 'user' , 
          type : 'topic' 
          
        }, { 
          name : 'branch' , 
          type : 'topic' 
          
        }
      ],
      uri: 'amqp://127.0.0.1:5672',
    }),],
  controllers: [
    ProductController,
    BranchController,
    UserController,
  ],

  providers: [
    MessagingService,
    infrastructureServiceProduct, userServiceIntrastructure,infrastuctureBranchService,
     ],
})
export class AppModule {}

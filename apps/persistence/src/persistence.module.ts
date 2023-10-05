import { Module } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { BranchController, DatabaseModule,   UserController,  } from './infrastructure';
import { ProductController } from './infrastructure/controller/product.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MyRabbitSubscriber } from './infrastructure/service/eventServiceHandler';
import { MongoServerErrorExceptionFilter } from './infrastructure/utils/exception-filters';
import { ErrorExceptionFilter } from './infrastructure/utils/exception-filters/error.exception-filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule,
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
    BranchController,
    ProductController,
    UserController,
  ],

  providers: [  {
    provide: APP_FILTER,
    useClass: MongoServerErrorExceptionFilter,
  },  {
    provide: APP_FILTER,
    useClass: ErrorExceptionFilter,
  },UserController,
    MyRabbitSubscriber,
    BranchController,
    ProductController
  ],
})
export class PersistenceModule {}

import { Module } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport,  } from '@nestjs/microservices';
import { BranchController, DatabaseModule,   UserController,  } from './infrastructure';
import { ProductController } from './infrastructure/controller/product.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MyRabbitSubscriber } from './infrastructure/service/eventServiceHandler';

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

  providers: [UserController,
    MyRabbitSubscriber,
    BranchController,
    ProductController
  ],
})
export class PersistenceModule {}

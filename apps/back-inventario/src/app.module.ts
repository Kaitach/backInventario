import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
/* eslint-disable prettier/prettier */
import { ProductController } from './infrastructure/controller/product.controller';
import { BranchController } from './infrastructure/controller/branch.controller';
import { UserController } from './infrastructure/controller/user.controller';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from './infrastructure/database/database.module';
import { infrastructureServiceProduct } from './infrastructure/service/infrastructure.service';
import { userServiceIntrastructure } from './infrastructure/service/infrastructureUser.service';
import { infrastuctureBranchService } from './infrastructure/service/infrastructureBranch.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MessagingService } from './infrastructure/events/service/serviceEvent';
import { APP_FILTER } from '@nestjs/core';
import { ErrorExceptionFilter } from './infrastructure/utils/exception-filters/error.exception-filter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule,
    CqrsModule,ConfigModule.forRoot({
      envFilePath: '.env',
    }),
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
      uri: process.env.RABBITURL ,
    }),],
  controllers: [
    ProductController,
    BranchController,
    UserController,
  ],

  providers: [    {
    provide: APP_FILTER,
    useClass: ErrorExceptionFilter,
  },
    MessagingService,
    infrastructureServiceProduct, userServiceIntrastructure,infrastuctureBranchService,
     ],
})
export class AppModule {}

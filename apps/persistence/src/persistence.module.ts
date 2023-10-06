import { Module } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { BranchController, BranchTypeOrmEntity, DatabaseModule,   ProductTypeOrmEntity,   UserController, UserTypeOrmEntity,  } from './infrastructure';
import { ProductController } from './infrastructure/controller/product.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MyRabbitSubscriber } from './infrastructure/service/eventServiceHandler';
import { MongoServerErrorExceptionFilter } from './infrastructure/utils/exception-filters';
import { ErrorExceptionFilter } from './infrastructure/utils/exception-filters/error.exception-filter';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleTypeOrmEntity } from './infrastructure/database/mysql/entities/salesDBEntity';

@Module({
  imports: [
    DatabaseModule,
    CqrsModule,ConfigModule.forRoot({
      envFilePath: '.env',
    }),TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_DATABASE,
      entities: [
        BranchTypeOrmEntity,
        UserTypeOrmEntity,
        ProductTypeOrmEntity,
        SaleTypeOrmEntity,
      ],
      synchronize: true,
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

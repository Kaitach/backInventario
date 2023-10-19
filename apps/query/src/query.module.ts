import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule, BranchTypeOrmEntity, UserTypeOrmEntity, ProductTypeOrmEntity, BranchController, ProductController,  MongoServerErrorExceptionFilter, ErrorExceptionFilter, MyRabbitSubscriber } from "./infrastructure";
import { SaleTypeOrmEntity } from "./infrastructure/database/mysql/entities/salesDBEntity";
import { ConfigModule } from '@nestjs/config';

import { CqrsModule } from '@nestjs/cqrs';
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
       
    }),
  ],
  controllers: [
    BranchController,
    ProductController,
  ],

  providers: [ 
     {
    provide: APP_FILTER,
    useClass: MongoServerErrorExceptionFilter,
  },  {
    provide: APP_FILTER,
    useClass: ErrorExceptionFilter,
  },
    MyRabbitSubscriber,

  ],
})
export class queryModule {}

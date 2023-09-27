/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmMysqlConfigService } from './configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchTypeOrmEntity, ProductTypeOrmEntity, UserTypeOrmEntity } from './entities';
import { branchServiceBD, productServiceBD, userDBService } from './services';
import { ProductRepository, branchRepository, userRepository } from './repositories';
import { MongoModule } from '../mongoDB/mongo.module';
import { EventRepository } from '../mongoDB/repository/eventRepository';

;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmMysqlConfigService,
    }),
    TypeOrmModule.forFeature([
    UserTypeOrmEntity
      , ProductTypeOrmEntity, BranchTypeOrmEntity
    ]),
    MongoModule,
  ],
  controllers: [],
  providers: [EventRepository, userDBService, userRepository, productServiceBD, ProductRepository, branchRepository, branchServiceBD],
  exports: [EventRepository,userDBService, userRepository, productServiceBD, ProductRepository, branchRepository, branchServiceBD],
})
export class DatabaseModule { }

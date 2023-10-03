/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmMysqlConfigService } from './configs';
import {
  BranchTypeOrmEntity,
  ProductTypeOrmEntity,
  UserTypeOrmEntity,
} from './entities';
import {
  ProductRepository,
  branchRepository,
  userRepository,
} from './repositories';
import { branchServiceBD, productServiceBD, userDBService } from './services';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmMysqlConfigService,
    }),
    TypeOrmModule.forFeature([
      UserTypeOrmEntity,
      ProductTypeOrmEntity,
      BranchTypeOrmEntity,
    ]),

  ],
  controllers: [],
  providers: [
    userDBService,
    userRepository,
    productServiceBD,
    ProductRepository,
    branchRepository,
    branchServiceBD,
  ],
  exports: [
    userDBService,
    userRepository,
    productServiceBD,
    ProductRepository,
    branchRepository,
    branchServiceBD,
  ],
})
export class DatabaseModule {}

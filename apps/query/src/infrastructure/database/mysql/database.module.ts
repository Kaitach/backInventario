/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
import { SaleTypeOrmEntity } from './entities/salesDBEntity';
import { SaleTypeOrmRepository } from './repositories/saleRepository';
import { SaleServiceBD } from './services/saleBd.service';
import { userDBService, productServiceBD, branchServiceBD } from './services';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([
      UserTypeOrmEntity,
      ProductTypeOrmEntity,
      BranchTypeOrmEntity,
      SaleTypeOrmEntity
    ])

  ],
  controllers: [],
  providers: [
    userDBService,
    userRepository,
    productServiceBD,
    ProductRepository,
    branchRepository,
    branchServiceBD,
    SaleTypeOrmRepository,
    SaleServiceBD
    
  ],
  exports: [
    userDBService,
    userRepository,
    productServiceBD,
    ProductRepository,
    branchRepository,
    branchServiceBD,
    SaleTypeOrmRepository,
    SaleServiceBD
    
  ],
})
export class DatabaseModule {}

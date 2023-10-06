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
import { SaleTypeOrmEntity } from './entities/salesDBEntity';
import { SaleTypeOrmRepository } from './repositories/saleRepository';
import { SaleServiceBD } from './services/saleBd.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([
      UserTypeOrmEntity,
      ProductTypeOrmEntity,
      BranchTypeOrmEntity,
      SaleTypeOrmEntity
    ]),TypeOrmModule.forRoot({
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

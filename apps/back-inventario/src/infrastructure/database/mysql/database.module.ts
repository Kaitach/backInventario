/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmMysqlConfigService } from './configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchTypeOrmEntity, ProductTypeOrmEntity, UserTypeOrmEntity } from './entities';
import { branchServiceBD, productServiceBD, userDBService } from './services';
import { ProductRepository, branchRepository, userRepository } from './repositories';

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
  ],
  controllers: [],
  providers: [userDBService, userRepository, productServiceBD, ProductRepository, branchRepository, branchServiceBD],
  exports: [userDBService, userRepository, productServiceBD, ProductRepository, branchRepository, branchServiceBD],
})
export class DatabaseModule { }

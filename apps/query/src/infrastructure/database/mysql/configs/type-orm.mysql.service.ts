/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { BranchTypeOrmEntity, ProductTypeOrmEntity, UserTypeOrmEntity } from "../entities";
import { SaleTypeOrmEntity } from "../entities/salesDBEntity";


@Injectable()
export class TypeOrmMysqlConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      name: connectionName,
      host: process.env.MYSQL_DB_HOST ,
      port:  parseInt(process.env.MYSQL_DB_PORT) ,
      username:  process.env.MYSQL_ROOT_PASSWORD ,
      password:   process.env.MYSQL_ROOT_PASSWORD  ,
      database: process.env.MYSQL_DATABASE ,
      entities: [BranchTypeOrmEntity, ProductTypeOrmEntity, UserTypeOrmEntity, SaleTypeOrmEntity],
      synchronize: true,
    };
  }
}

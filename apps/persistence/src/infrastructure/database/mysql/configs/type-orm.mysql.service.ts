/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { BranchTypeOrmEntity, ProductTypeOrmEntity, UserTypeOrmEntity } from "../entities";


@Injectable()
export class TypeOrmMysqlConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      name: connectionName,
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'inventariotraining',
      entities: [BranchTypeOrmEntity, ProductTypeOrmEntity, UserTypeOrmEntity],
      synchronize: true,
    };
  }
}

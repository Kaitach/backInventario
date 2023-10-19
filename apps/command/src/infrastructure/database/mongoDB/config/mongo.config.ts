/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { MongooseOptionsFactory, MongooseModuleOptions } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri:'mongodb+srv://admin:admin@inventario.k32rhkn.mongodb.net/'

      ,
    };
  }
}


/* eslint-disable prettier/prettier */
import { ProductController } from './infrastructure/controller/product.controller';
import { BranchController } from './infrastructure/controller/branch.controller';
import { UserController } from './infrastructure/controller/user.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/mysql';


@Module({
  imports: [DatabaseModule],
  controllers: [
    ProductController,
    BranchController,
    UserController],
  providers: [],
})
export class AppModule { }

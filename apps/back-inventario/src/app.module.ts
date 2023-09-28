/* eslint-disable prettier/prettier */
import { ProductController } from './infrastructure/controller/product.controller';
import { BranchController } from './infrastructure/controller/branch.controller';
import { UserController } from './infrastructure/controller/user.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/mysql';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/utils/middleware/jwt.middleware';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBranchHandler } from './infrastructure/events/CreateBranchHandler';
import { CreateUserHandler } from './infrastructure/events/CreateUserHandler';
import { newProductHandler } from './infrastructure/events/newProductHandler';
import { newProductInventoryHandler } from './infrastructure/events/newProductInventoryHandler';
import { newProductReSellerHandler } from './infrastructure/events/newProductReSallerHandler';
import { NewProductSaleHandler } from './infrastructure/events/newProductSaleHandler';


@Module({
  imports: [DatabaseModule,CqrsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'claveSuperSegura', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    ProductController,
    BranchController,
    UserController],
    
  providers: [JwtStrategy, CreateBranchHandler, CreateUserHandler, newProductHandler, newProductInventoryHandler, newProductReSellerHandler, NewProductSaleHandler ],
})
export class AppModule { }

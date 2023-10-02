import { RabbitController } from './infrastructure/controller/rabitcontroller.controller';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
/* eslint-disable prettier/prettier */
import { ProductController } from './infrastructure/controller/product.controller';
import { BranchController } from './infrastructure/controller/branch.controller';
import { UserController } from './infrastructure/controller/user.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/mysql';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBranchHandler } from './infrastructure/events/CreateBranchHandler';
import { CreateUserHandler } from './infrastructure/events/CreateUserHandler';
import { newProductInventoryHandler } from './infrastructure/events/newProductInventoryHandler';
import { newProductReSellerHandler } from './infrastructure/events/newProductReSallerHandler';
import { NewProductSaleHandler } from './infrastructure/events/newProductSaleHandler';
import { EventRepository } from './infrastructure';

@Module({
  imports: [
    DatabaseModule,
    CqrsModule,
    ClientsModule.register([
      {
        name: 'inventory',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'branch',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [
    RabbitController,

    ProductController,
    BranchController,
    UserController,
  ],

  providers: [
    {
      provide: CreateBranchHandler,
      useFactory: (repository: EventRepository, client: ClientProxy) =>
        new CreateBranchHandler(repository, client),
      inject: [EventRepository, 'inventory'],
    },
    {
      provide: CreateUserHandler,
      useFactory: (repository: EventRepository, client: ClientProxy) =>
        new CreateUserHandler(repository, client),
      inject: [EventRepository, 'inventory'],
    },

    {
      provide: newProductInventoryHandler,
      useFactory: (repository: EventRepository, client: ClientProxy) =>
        new newProductInventoryHandler(repository, client),
      inject: [EventRepository, 'inventory'],
    },

    {
      provide: newProductReSellerHandler,
      useFactory: (repository: EventRepository, client: ClientProxy) =>
        new newProductReSellerHandler(repository, client),
      inject: [EventRepository, 'inventory'],
    },

    {
      provide: NewProductSaleHandler,
      useFactory: (repository: EventRepository, client: ClientProxy) =>
        new NewProductSaleHandler(repository, client),
      inject: [EventRepository, 'inventory'],
    },


  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport,  } from '@nestjs/microservices';
import { BranchController, DatabaseModule,   UserController,  } from './infrastructure';
import { ProductController } from './infrastructure/controller/product.controller';

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
    ]),],
  controllers: [

    ProductController,
    BranchController,
    UserController,
  ],

  providers: [
 
  ],
})
export class PersistenceModule {}

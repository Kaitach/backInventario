import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AuthService } from './infrastructure/service/jwt-auth.service';
import { InfrastrucureModule } from './infrastructure/infrastrucure.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { DuplicateKeyFilter } from './infrastructure/utils/filter/filterMongo.duplicate';


@Module({
  imports: [InfrastrucureModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
      RabbitMQModule.forRoot(RabbitMQModule, {
        exchanges: [
          {
            name: 'invetory.sofka1',
            type: 'topic',
          },
          {
            name: 'productInventory',
            type: 'topic',
          },
          {
            name: 'user',
            type: 'topic',
          },
          {
            name: 'branch',
            type: 'topic',
          },
        ],
        uri: process.env.RABBITURL ,
      }),
    ],
  controllers: [],
  providers: [AuthService, {
    provide: APP_FILTER,
    useClass: DuplicateKeyFilter,
  }, ],
})
export class JwtAuthModule {}

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongoModule, EventRepository } from './mongoDB';

;


@Module({
  imports: [   
    MongoModule,
  ],
  controllers: [],
  providers: [
    EventRepository,

  ],
  exports: [
    EventRepository,
   
  ],
})
export class DatabaseModule {}

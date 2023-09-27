/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EventSchema } from './schemas/eventSchema';
import { EventRepository } from './repository/eventRepository';

@Module({
  imports: [
    
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@inventario.k32rhkn.mongodb.net/'
,
      {
        autoCreate: true,
      },
    ),
    MongooseModule.forFeature([
      { name: 'Event', schema: EventSchema },
    ]),
  ],
  controllers: [],
  providers: [  EventRepository],
  exports: [

   
    EventRepository,
    MongooseModule.forFeature([
      { name: 'Event', schema: EventSchema },
    ]),
  ],
})
export class MongoModule {}

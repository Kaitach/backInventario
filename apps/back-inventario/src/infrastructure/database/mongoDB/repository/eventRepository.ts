/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EventDocument } from "../schemas/eventSchema";
import { Observable, from,  } from 'rxjs';
import { CreateEventDto } from "../../../utils/dto/eventDto";

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<EventDocument>,
  ) {}

  create(eventData: CreateEventDto): Observable<EventDocument> {
    console.log("hgolas")
    const createdEvent = new this.eventModel(eventData);
    return from(createdEvent.save());
  } 
}
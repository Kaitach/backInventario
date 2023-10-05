/* eslint-disable prettier/prettier */
import { Schema, Document } from 'mongoose';

export class EventDocument extends Document {
  eventId: string;
  eventType: string;
  eventData: Record<string, any>;
  eventPublishedAt: Date;
  eventAggregateId:string
}

export const EventSchema = new Schema<EventDocument>({
  eventId: { type: String, required: true },
  eventType: { type: String, required: true },
  eventData: { type: String, required: true },
  eventPublishedAt: { type: Date, default: Date.now },
  eventAggregateId: { type: String, required: true },

});

export const EventModelName = 'Event';

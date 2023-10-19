import { v4 as uuidv4 } from 'uuid';

/* eslint-disable prettier/prettier */
export class CreateEventDto {
     eventId: string;
     eventType: string;
     eventData: string
     eventPublishedAt: Date;
     eventAggregateRootId:string


    constructor(eventData: string, eventName:string, eventAggregateRootId:string ) {
        this.eventId = uuidv4(); 
        this.eventType = eventName;
        this.eventData = eventData; 
        this.eventPublishedAt = new Date();
        this.eventAggregateRootId = eventAggregateRootId

      }
  }

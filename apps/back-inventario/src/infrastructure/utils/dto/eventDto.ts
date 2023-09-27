import { v4 as uuidv4 } from 'uuid';

/* eslint-disable prettier/prettier */
export class CreateEventDto {
    readonly eventId: string;
    readonly eventType: string;
    readonly eventData: string
    readonly eventPublishedAt: Date;



    constructor(eventData: string, eventName:string ) {
        this.eventId = uuidv4(); 
        this.eventType = eventName;
        this.eventData = eventData; 
        this.eventPublishedAt = new Date(); // Establecer la fecha actual
      }
  }

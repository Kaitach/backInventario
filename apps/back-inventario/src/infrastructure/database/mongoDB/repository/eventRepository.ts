import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EventDocument } from "../schemas/eventSchema";
import { Observable, from, of, throwError } from 'rxjs';
import { CreateEventDto } from "../../../utils/dto/eventDto";
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<EventDocument>,
  ) {}

  create(eventData: CreateEventDto): Observable<EventDocument | string> {
    // Analizar eventData para obtener el productId
    const eventDataObject = JSON.parse(eventData.eventData);
    const productId = eventDataObject.productId;

    return from(this.eventModel.findOne({ 'eventData.productId': productId })).pipe(
      switchMap((event) => {
        if (!event) {
          return throwError('No se encontró el evento con productId: ' + productId);
        }

        eventData.eventAggregateId = event.eventAggregateId;

        // Crear un nuevo evento con eventData y guardar en la base de datos
        const newEvent = new this.eventModel({
          eventData: eventData,
        });

        return from(newEvent.save()).pipe(
          switchMap((savedEvent) => {
            // Devolver el evento guardado en la base de datos
            return of(savedEvent);
          })
        );
      }),
      catchError((error) => {
        return throwError('Error al buscar o guardar el evento: ' + error);
      })
    );
  } 
}

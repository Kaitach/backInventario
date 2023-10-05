import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateEventDto } from "../../../utils";
import { EventDocument } from "../schemas";
import { Observable, catchError, from, of, switchMap, throwError } from "rxjs";

export class EventRepository {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<EventDocument>,
  ) {}

  create(event: CreateEventDto): void {
    

    // Llama a findOne para buscar el evento
    this.findOne(event.eventAggregateId).subscribe((foundEvent) => {
      if (foundEvent) {
        // El evento fue encontrado, puedes hacer algo con él aquí
        console.log('Evento encontrado:', foundEvent);
  
        // Ahora puedes crear el nuevo evento
        this.eventModel.create(event);
      } else {
        // No se encontró el evento, puedes manejarlo aquí
        console.log('No se encontró ningún evento con eventAggregateId:', event.eventAggregateId);
      }
    });
  }


  findOne(branchId: string): Observable<EventDocument> {
    return from(this.eventModel.findOne({ 'eventAggregateId': branchId })).pipe(
      switchMap((event) => {
        if (!event) {
          console.log('No se encontró ningún evento con branchId:', branchId);
          return of(null);
        }
        console.log('Evento encontrado:', event);
        return of(event);
      }),
      catchError((error) => {
        console.error('Error al buscar el evento:', error);
        return throwError('Error al buscar el evento: ' + error);
      })
    );
}

}
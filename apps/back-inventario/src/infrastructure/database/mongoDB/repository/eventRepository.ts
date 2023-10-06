import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from '../../../utils';
import { EventDocument } from '../schemas';
import { Observable,  catchError,  from, map, of, switchMap, throwError,    } from 'rxjs';
import { IBranchRegister, RegisterProductDTO, RegisterUserDto } from 'apps/persistence/src';

export class EventRepository {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<EventDocument>,
  ) {}

  

  saveEvent(event: CreateEventDto, eventAggregateRootId: string): void {
    event.eventAggregateRootId = eventAggregateRootId
    this.eventModel.create(event);
  }

  existBranch(branch: IBranchRegister): Observable<boolean> {
 
    return from(
      this.eventModel
        .find({
          eventType: 'BranchRegister',
        })
        .exec()
    ).pipe(
      map((results) => {
        const branchExists = results.some((result) => {
          try {
            console.log(result);
            const eventDataJson = JSON.parse(result.eventData as unknown as string);
            if (
              eventDataJson.name === branch.name &&
              eventDataJson.location === branch.location
            ) {
              return true;
            }
          } catch (error) {
            console.error('Error al analizar eventData:', error);
          }
          return false;
        });
        return branchExists;
      }),
      switchMap((branchExists) => {
        if (branchExists) {
          return throwError('La sucursal ya existe.');
        } else {
          return of(false);
        }
      }),
      catchError((error) => {
        console.error('Error al buscar sucursales en la base de datos:', error);
        return throwError('Error al buscar sucursales en la base de datos.');
      })
    );
  }
  
  
  
  
  
  
  existUser(user: RegisterUserDto): Observable<boolean> {
console.log(user)   
 return from(
      this.eventModel.find({
        eventType: 'new.User',
        eventAggregateRootId: user.branchId,
      }).exec()
    ).pipe(
      map((results) => {
        const eventExists = results.some((result) => {
          try {
            const eventDataJson = JSON.parse(result.eventData as unknown as string);
            return eventDataJson.email === user.email;
          } catch (error) {
            console.error('Error al analizar eventData:', error);
            return false;
          }
        });
        return eventExists;
      }),
      switchMap((eventExists) => {
        if (eventExists) {
          return throwError('El usuario ya existe.');
        } else {
          return of(false);
        }
      }),
      catchError((error) => {
        console.error('Error al buscar eventos en la base de datos:', error);
        return throwError('Error al buscar eventos en la base de datos.');
      })
    );
  }

  

  existProduct(product: RegisterProductDTO): Observable<boolean> {
    return from(
      this.eventModel.find({
        eventAggregateRootId: product.branchId,
        eventType: 'productRegister',
      }).exec()
    ).pipe(
      map((results) => {
        const eventExists = results.some((result) => {
          try {
            const eventDataJson = JSON.parse(result.eventData as unknown as string);
            return eventDataJson.name === product.name;
          } catch (error) {
            console.error('Error al analizar eventData:', error);
            return false;
          }
        });
        return eventExists;
      }),
      switchMap((eventExists) => {
        if (eventExists) {
          return throwError('El producto ya existe.');
        } else {
          return of(false);
        }
      }),
      catchError((error) => {
        console.error('Error al buscar eventos en la base de datos:', error);
        return throwError('Error al buscar eventos en la base de datos.');
      })
    );
  }

  

  findProduct(branchId: string, productId: string): Observable<any | null> {
    return from(
      this.eventModel
        .find({
          eventAggregateRootId: branchId,
          eventType: 'updateProduct', 
        })
        .sort({ eventPublishedAt: -1 }) 
        .exec()
    ).pipe(
      map((events: EventDocument[]) => {
        if (events.length === 0) {
          return null;
        }
  
        for (const event of events) {
          const eventData = JSON.parse(event.eventData as unknown as string);
  
          if (eventData.productId === productId) {
            return {
              productId: eventData.productId,
              quantity: eventData.quantity,
            };
          }
        }
  
        return null; 
      }),
      catchError((error) => {
        console.error('Error al buscar eventos en la base de datos:', error);
        return throwError('Error al buscar eventos en la base de datos.');
      })
    );
  }
}
  
  
  
  


import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../database';
import { CreateEventDto } from '../../utils';
import { catchError, throwError } from 'rxjs';
import { CommandBus } from '../../../../..';
import { SaleEntity } from 'src/domain/entities/sale.entity';

@Injectable()
export class MessagingService  implements CommandBus{
  constructor(private readonly amqpConnection: AmqpConnection,    
    private readonly repository: EventRepository,
    ) {}
  returnAddInventory(exchange: string, routeingKey: string, data: any, branchId: string, saleId:SaleEntity) {

    this.repository.findProduct(branchId, data.productId).subscribe(
      (result) => {
        if (result) {
          console.log('Evento encontrado:', result);
    
          data.quantity += result.quantity;
          const eventDataAsString = JSON.stringify(data);

          const createEventDto = new CreateEventDto(
          eventDataAsString,
          'saleUpdate',
         branchId,
         )
          this.repository.saveEvent(createEventDto, branchId);
          console.log(data)
       
          this.amqpConnection.publish(exchange, routeingKey, JSON.stringify(saleId));

        } else {
          console.log('No se encontraron eventos para el producto con productId:', data.productId);
    
        }
      },
      (error) => {
        console.error('Ocurrió un error al buscar el producto:', error);
      }
    );
  
  }
  registerSale(exchange: string, routeingKey: string, data: any, branchId: string) {
    const eventDataAsString = JSON.stringify(data);
    exchange = 'branch'
    routeingKey = 'saleEvent'
    const createEventDto = new CreateEventDto(
      eventDataAsString,
      routeingKey,
      branchId,
    );
    this.repository.saveEvent(createEventDto, branchId);
    console.log( 'sale evento' + JSON.stringify(data))
    this.amqpConnection.publish(exchange, routeingKey, JSON.stringify(data));  }
 

  

    registerUser(exchange: string, routeingKey: string, data: any, branchId:string) {
      this.amqpConnection.publish(exchange, routeingKey, data);
      const eventDataAsString = JSON.stringify(data);

      const createEventDto = new CreateEventDto(
        eventDataAsString,
        routeingKey,
        branchId,
      );

      this.repository.existUser(data)
      .subscribe(
        (exists) => {
          if (exists) {
            console.log('el usuario ya existe, muestra un mensaje de error si es necesario.');
          } else {
            this.repository.saveEvent(createEventDto, branchId);
            this.amqpConnection.publish(exchange, routeingKey, JSON.stringify(data));

          }
        },
        (error) => {
          console.error('Ocurrió un error:', error);
        }
      );

    }
    registerBranch(exchange: string, routeingKey: string, data: any, branchId:string) {
      const eventDataAsString = JSON.stringify(data);

      const createEventDto = new CreateEventDto(
        eventDataAsString,
        routeingKey,
        branchId,
      );

      this.repository.existBranch(data)
      .subscribe(
        (exists) => {
          if (exists) {
            console.log('La branch  ya existe, muestra un mensaje de error si es necesario.');
          } else {
            this.repository.saveEvent(createEventDto, branchId);
            this.amqpConnection.publish(exchange, routeingKey, JSON.stringify(data));

          }
        },
        (error) => {
          console.error('Ocurrió un error:', error);
        }
      );

    }
    registerProduct(exchange: string, routeingKey: string, data: any, branchId:string) {
      const eventDataAsString = JSON.stringify(data);

      const createEventDto = new CreateEventDto(
        eventDataAsString,
        routeingKey,
        branchId,
      );
    
      this.repository.existProduct(data)
      .subscribe(
        (exists) => {
          if (exists) {
            console.log('El producto ya existe, muestra un mensaje de error si es necesario.');
          } else {
            this.repository.saveEvent(createEventDto, branchId);
            createEventDto.eventType = 'updateProduct'
            data.quantity = 0
            createEventDto.eventData = JSON.stringify(data);
            this.repository.saveEvent(createEventDto, branchId)
            this.amqpConnection.publish(exchange, routeingKey, JSON.stringify(data));

          }
        },
        (error) => {
          console.error('Ocurrió un error:', error);
        }
      );
      }
    
      registerCustomerSale(exchange: string, routeingKey: string, data: any, branchId: string) {
        this.repository.findProduct(branchId, data.productId).pipe(
          catchError((error) => {
            console.error('Ocurrió un error al buscar el producto:', error);
            return throwError(new Error('Error al buscar el producto'));
          })
        ).subscribe((result) => {
          if (result) {
            const newQuantity = result.quantity - data.quantity;
      
            if (newQuantity < 0) {
              const customError = new Error('Error de cantidad insuficiente');
              return throwError(customError);
            } else {
              data.quantity = newQuantity;
      
              const eventDataAsString = JSON.stringify(data);
              const createEventDto = new CreateEventDto(
                eventDataAsString,
                'updateProduct',
                branchId
              );
              this.repository.saveEvent(createEventDto, branchId);
      
            

              this.amqpConnection.publish(exchange, routeingKey, JSON.stringify(data))         }
          } else {
            console.log('No se encontraron eventos para el producto con productId:', data.productId);
          }
        });
      }
    
    registerSellerSale(exchange: string, routeingKey: string, data: any, branchId:string) {
      routeingKey ='newProductReSeller'
      this.repository.findProduct(branchId, data.productId).pipe(
        catchError((error) => {
          console.error('Ocurrió un error al buscar el producto:', error);
          return throwError(new Error('Error al buscar el producto'));
        })
      ).subscribe((result) => {
        if (result) {
          const newQuantity = result.quantity - data.quantity;
    
          if (newQuantity < 0) {
            const customError = new Error('Error de cantidad insuficiente');
            return throwError(customError);
          } else {
            data.quantity = newQuantity;
    
            const eventDataAsString = JSON.stringify(data);
            const createEventDto = new CreateEventDto(
              eventDataAsString,
              'updateProduct',
              branchId
            );
            this.repository.saveEvent(createEventDto, branchId);
    
            
            
            this.amqpConnection.publish(exchange, routeingKey, JSON.stringify({  productId: data.productId,
            quantity: data.quantity,
            branchId:branchId}));
          }
        } else {
          console.log('No se encontraron eventos para el producto con productId:', data.productId);
        }
      });
    }
    
    registerAddInventory(exchange: string, routeingKey: string, data: any, branchId:string) {
    
        this.repository.findProduct(branchId, data.productId).subscribe(
          (result) => {
            if (result) {
              console.log('Evento encontrado:', result);
        
              data.quantity += result.quantity;
              const eventDataAsString = JSON.stringify(data);

              const createEventDto = new CreateEventDto(
              eventDataAsString,
              'updateProduct',
             branchId,
             )
              this.repository.saveEvent(createEventDto, branchId);
              console.log(data)

              this.amqpConnection.publish(exchange, routeingKey, JSON.stringify(data));

            } else {
              console.log('No se encontraron eventos para el producto con productId:', data.productId);
        
            }
          },
          (error) => {
            console.error('Ocurrió un error al buscar el producto:', error);
          }
        );
}



}
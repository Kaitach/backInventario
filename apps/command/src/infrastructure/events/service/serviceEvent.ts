import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../database';
import { CreateEventDto } from '../../utils';
import { catchError, throwError } from 'rxjs';
import { SaleEntity, CommandBus } from '../../../../../shared';

@Injectable()
export class MessagingService  implements CommandBus{
  constructor(private readonly amqpConnection: AmqpConnection,    
    private readonly repository: EventRepository,
    ) {}
  returnAddInventory(exchange: string, routeingKey: string, data: any, branchId: string, saleId:SaleEntity) {
    const quantity = data.quantity

    this.repository.findProduct(branchId, data.productId).subscribe(
      (result) => {
        if (result) {
          console.log('Evento encontrado:', result);
    
          data.quantity =   quantity + result.quantity;
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


  

    registerUser(exchange: string, routeingKey: string, data: any, branchId:string) {
   

      this.repository.existUser(data)
      .subscribe(
        (exists) => {
          if (exists) {
            console.log('el usuario ya existe, muestra un mensaje de error si es necesario.');
          } else {
            console.log(data)
            this.amqpConnection.publish(exchange, routeingKey, JSON.stringify(data));

          }
        },
        (error) => {
          console.error('Ocurrió un error:', error);
        }
      );

    }
    registerBranch(exchange: string, routeingKey: string, data: any, branchId:string) {
     

      this.repository.existBranch(data)
      .subscribe(
        (exists) => {
          if (exists) {
            console.log('La branch  ya existe, muestra un mensaje de error si es necesario.');
          } else {
            this.amqpConnection.publish(exchange, routeingKey, JSON.stringify(data));

          }
        },
        (error) => {
          console.error('Ocurrió un error:', error);
        }
      );

    }
    registerProduct(exchange: string, routeingKey: string, data: any, branchId:string) {
   
    
      this.repository.existProduct(data)
      .subscribe(
        (exists) => {
          if (exists) {
            console.log('El producto ya existe, muestra un mensaje de error si es necesario.');
          } else {
            
            data.quantity = 0
           
            this.amqpConnection.publish(exchange, routeingKey, JSON.stringify(data));

          }
        },
        (error) => {
          console.error('Ocurrió un error:', error);
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
     
      registerCustomerSale(exchange: string, routeingKey: string, data: any, branchId: string) {
        const quantity = data.quantity
        
        this.repository.findProduct(branchId, data.productId).pipe(
          catchError((error) => {
            console.error('Ocurrió un error al buscar el producto:', error);
            return throwError(new Error('Error al buscar el producto'));
          })
        ).subscribe((result) => {
          if (result) {
            const newQuantity = result.quantity - quantity
            
            if (newQuantity < 0) {
              const customError = new Error('Error de cantidad insuficiente');
              return throwError(customError);
            } else {
              data.quantity = newQuantity;
              data.name = result.name
              this.amqpConnection.publish(exchange, routeingKey, JSON.stringify(data))         }
          } else {
            console.log('No se encontraron eventos para el producto con productId:', data.productId);
          }
        });
      }
    
    registerSellerSale(exchange: string, routeingKey: string, data: any, branchId:string) {
      routeingKey ='newProductReSeller'
      const quantity = data.quantity

      this.repository.findProduct(branchId, data.productId).pipe(
        catchError((error) => {
          console.error('Ocurrió un error al buscar el producto:', error);
          return throwError(new Error('Error al buscar el producto'));
        })
      ).subscribe((result) => {
        if (result) {
          const newQuantity = result.quantity - quantity;
    
          if (newQuantity < 0) {
            const customError = new Error('Error de cantidad insuficiente');
            return throwError(customError);
          } else {
            data.quantity = newQuantity;
            data.name  = result.name
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
      const quantity = data.quantity

        this.repository.findProduct(branchId, data.productId).subscribe(
          (result) => {
            if (result) {
           
              data.name = result.name

              data.quantity = quantity + result.quantity;
              routeingKey = 'new.productInventory'
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
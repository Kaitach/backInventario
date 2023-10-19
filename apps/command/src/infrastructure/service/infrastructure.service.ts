import { Injectable } from '@nestjs/common';
import { ProductDomainService, IProductEntity, 
 } from '../../../../shared';
import { CreateEventDto, EventRepository } from '..';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class infrastructureServiceProduct implements   ProductDomainService<IProductEntity>  {

constructor(
  private readonly repository: EventRepository,

){}


returnquantity(data: IProductEntity): any{
  const quantity = data.quantity
  this.repository.findProduct(data.branchId, data.productId).subscribe(
    (result) => {
      if (result) {
        console.log('Evento en donde tiene que ir :', result);
        console.log('Evento en donde tiene que ir :', data);

        data.quantity =   quantity + result.quantity;
        const eventDataAsString = JSON.stringify(data);
        console.log('el evento guardado quedo con :', data);
        const createEventDto = new CreateEventDto(
        eventDataAsString,
        'updateProduct',
        data.branchId,
       )
        this.repository.saveEvent(createEventDto, data.branchId);
        console.log(data)


      } else {
        console.log('No se encontraron eventos para el producto con productId:', data.productId);
  
      }
    },
    (error) => {
      console.error('Ocurrió un error al buscar el producto:', error);
    }
  );
 }
  registerquantity(data: IProductEntity): any{
    const quantity = data.quantity
        const name = data.name

    this.repository.findProduct(data.branchId, data.productId).subscribe(
      (result) => {
        if (result) {
          console.log('Evento en donde tiene que ir :', result);
          console.log('Evento en donde tiene que ir :', data);

          data.quantity =   quantity + result.quantity;
          const eventDataAsString = JSON.stringify(data);
          console.log('el evento guardado quedo con :', data);
          data.name = name
          const createEventDto = new CreateEventDto(
          eventDataAsString,
          'updateProduct',
          data.branchId,
         )
          this.repository.saveEvent(createEventDto, data.branchId);
          console.log(data)


        } else {
          console.log('No se encontraron eventos para el producto con productId:', data.productId);
    
        }
      },
      (error) => {
        console.error('Ocurrió un error al buscar el producto:', error);
      }
    );
   }

  
  returnAddInventory( data: any, branchId: string, ) {
    const quantity = data.quantity

    this.repository.findProduct(branchId, data.productId).subscribe(
      (result) => {
        if (result) {
          console.log('Evento encontrado:', result);
    
          data.quantity = result.quantity + quantity;
          const eventDataAsString = JSON.stringify(data);

          const createEventDto = new CreateEventDto(
          eventDataAsString,
          'saleUpdate',
         branchId,
         )
          this.repository.saveEvent(createEventDto, branchId);
          console.log(data)
       

        } else {
          console.log('No se encontraron eventos para el producto con productId:', data.productId);
    
        }
      },
      (error) => {
        console.error('Ocurrió un error al buscar el producto:', error);
      }
    );
  
  }
  registerResellerSale( data: IProductEntity): any {
    const eventDataAsString = JSON.stringify(data);
   const  routeingKey = 'saleEvent'
    const createEventDto = new CreateEventDto(
      eventDataAsString,
      routeingKey,
      data.branchId,
    );
    this.repository.saveEvent(createEventDto, data.branchId);
    console.log( 'sale evento' + JSON.stringify(data))
 

    } 

    registerProduct( data: IProductEntity):  any {
      const eventDataAsString = JSON.stringify(data);
      const  routeingKey = 'productRegister'

      const createEventDto = new CreateEventDto(
        eventDataAsString,
        routeingKey,
        data.branchId,
      );
    
      this.repository.existProduct(data)
      .subscribe(
        (exists) => {
          if (exists) {
            console.log('El producto ya existe, muestra un mensaje de error si es necesario.');
          } else {
            this.repository.saveEvent(createEventDto, data.branchId);
            createEventDto.eventType = 'updateProduct'
            data.quantity = 0
            createEventDto.eventData = JSON.stringify(data);
            this.repository.saveEvent(createEventDto, data.branchId)

          }
        },
        (error) => {
          console.error('Ocurrió un error:', error);
        }
      );
      }
    
      registerCustomerSale(data: any): any {
        const quantity = data.quantity

        this.repository.findProduct(data.branchId, data.productId).pipe(
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
              data.name = result.name

              const eventDataAsString = JSON.stringify(data);
              const createEventDto = new CreateEventDto(
                eventDataAsString,
                'updateProduct',
                data.branchId
              );
              this.repository.saveEvent(createEventDto, data.branchId);
                  

                     }
          } else {
            console.log('No se encontraron eventos para el producto con productId:', data.productId);
          }
        });
      }
    
    registerSellerSale(exchange: string, routeingKey: string, data: any, branchId:string) {
      const quantity = data.quantity

      routeingKey ='newProductReSeller'
      this.repository.findProduct(branchId, data.productId).pipe(
        catchError((error) => {
          console.error('Ocurrió un error al buscar el producto:', error);
          return throwError(new Error('Error al buscar el producto'));
        })
      ).subscribe((result) => {
        if (result) {
          const newQuantity =  result.quantity - quantity;
          data.name = result.name

          if (newQuantity < 0) {
            const customError = new Error('Error de cantidad insuficiente');
            return throwError(customError);
          } else {
            data.quantity = newQuantity;
            data.name  = result.name

            const eventDataAsString = JSON.stringify(data);
            const createEventDto = new CreateEventDto(
              eventDataAsString,
              'updateProduct',
              branchId
            );
            this.repository.saveEvent(createEventDto, branchId);
    
            
          }
         
        } else {
          console.log('No se encontraron eventos para el producto con productId:', data.productId);
        }
      });
    }
    
  

}

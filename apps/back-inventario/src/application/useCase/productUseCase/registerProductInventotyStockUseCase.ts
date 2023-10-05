/* eslint-disable prettier/prettier */
import { Observable, mergeMap, of, throwError } from 'rxjs';
import {
  CommandBus,
  IProductEntity,
} from '../../../../../';
import { ProductDomainService } from './../../../domain/services/productServiceDomain';
export class registerquantityUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<IProductEntity>,
    private readonly comandBus: CommandBus,
  ) {}

  private validateProductData(
    id: string,
    data: IProductEntity,
    
  ): Observable<IProductEntity> {
    data.productId = id;
    const validatedProduct = new IProductEntity(data);

    return of(validatedProduct);
  }

  registerquantity(
    id: string,
    data: IProductEntity,
  ): Observable<IProductEntity> {
    return this.validateProductData(id, data).pipe(
      mergeMap(() => {
        if (data.quantity < 0) {
          return throwError('Product stock cannot be negative');
        }
            data.productId = id   
            const exchange = 'productInventory'
            const routingKey = 'new.productInventory'
            this.comandBus.execute(exchange,routingKey, JSON.stringify(data), '')
            console.log(data)
            return this.productDomainService.registerquantity(data);
          }),
        );
      }
    
  

  execute(data: IProductEntity, id: string): Observable<IProductEntity> {
    return this.registerquantity(id, data);
  }
}

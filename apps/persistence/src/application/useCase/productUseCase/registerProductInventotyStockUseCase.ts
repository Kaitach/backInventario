/* eslint-disable prettier/prettier */
import { IProductEntity } from 'apps/persistence/src/domain/entities/productEntityDomain';
import { ProductDomainService } from 'apps/persistence/src/domain/services/productServiceDomain';
import { Observable, catchError, map, mergeMap, of, throwError } from 'rxjs';

export class registerquantityUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<IProductEntity>,
  ) {}



  registerquantity(
    id: string,
    data: IProductEntity,
  ): Observable<IProductEntity> {
 
    data.productId = id;

    const validatedProduct = new IProductEntity(data);

            return this.productDomainService.registerquantity(validatedProduct);
       
      }

  execute(data: IProductEntity, id: string): Observable<IProductEntity> {
 

    return this.registerquantity(id, data);
  }
}

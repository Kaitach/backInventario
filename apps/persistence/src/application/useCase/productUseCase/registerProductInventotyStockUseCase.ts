/* eslint-disable prettier/prettier */
import { IProductEntity } from 'apps/persistence/src/domain/entities/productEntityDomain';
import { ProductDomainService } from 'apps/persistence/src/domain/services/productServiceDomain';
import { Observable, catchError, map, mergeMap, of, throwError } from 'rxjs';

export class registerquantityUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<IProductEntity>,
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
   console.log(data)
    console.log('ya paso crack')
    console.log(data)

        return this.productDomainService.findByID(id).pipe(
          catchError(() => throwError('Product not found')),
          map((product) => {
            console.log(product)
            if (!product) {
              throw new Error('Product not found');
            }

            product.quantity = product.quantity + data.quantity
            data.branchId = product.branchId;
           
            return this.productDomainService.registerquantity(product);
          }),
          mergeMap((savedProduct) => savedProduct),
        );
      }

  execute(data: IProductEntity, id: string): Observable<IProductEntity> {
 

    return this.registerquantity(id, data);
  }
}
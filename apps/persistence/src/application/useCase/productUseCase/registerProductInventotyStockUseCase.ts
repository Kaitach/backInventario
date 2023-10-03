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
    return this.validateProductData(id, data).pipe(
      mergeMap(() => {
        if (data.quantity < 0) {
          return throwError('Product stock cannot be negative');
        }

        return this.productDomainService.findByID(data.productId).pipe(
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
      }),
    );
  }

  execute(data: IProductEntity, id: string): Observable<IProductEntity> {
    return this.registerquantity(id, data);
  }
}

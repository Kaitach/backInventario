/* eslint-disable prettier/prettier */
import {
  Observable,
  catchError,
  map,
  mergeMap,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import {
  IProductEntity,
} from '../../../../../shared';
import { ProductDomainService }  from '../../../../../shared';
export class RegisterResellerSaleUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<IProductEntity>,
  ) {}

  private validateProductData(
    id: string,
    data: IProductEntity,
  ): Observable<IProductEntity> {
    console.log(data)
    return of(data);
  }

  registerResellerSale(data: IProductEntity): Observable<IProductEntity> {
    return this.productDomainService.findByID(data.productId as string).pipe(
      catchError(() => throwError('Product not found')),

      map((product) => {
        if (!product) {
          throw new Error('Product not found');
        }

    

        console.log('la conncha de tu madre' + product)
        return this.productDomainService.registerResellerSale(product);
      }),
      mergeMap((savedProduct) => savedProduct),
    );
  }

  execute(data: IProductEntity, id: string): Observable<IProductEntity> {
    return this.validateProductData(id, data).pipe(
      switchMap((validatedProduct) =>
        this.registerResellerSale(validatedProduct),
      ),
      catchError((error) => throwError(`Validation error: ${error}`)),
    );
  }
}

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
} from '../../../../../';
import { ProductDomainService } from './../../../domain/services/productServiceDomain';
export class registerCustomerSaleUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<IProductEntity>,
  ) {}

  private validateProductData(
    data: IProductEntity,
  ): Observable<IProductEntity> {
    const validatedProduct = new IProductEntity(data);

    return of(validatedProduct);
  }

  registercustomerSale(data: IProductEntity): Observable<IProductEntity> {
    console.log(data);

    return this.productDomainService.findByID(data.productId as string).pipe(
      catchError(() => throwError('Product not found')),
      map((product) => {
        if (!product) {
          catchError(() => throwError('Product not found'));
        }

        if (product.quantity < data.quantity) {
          throw new Error('Insufficient inventory');
        }
      
        product.quantity = +product.quantity - +data.quantity;
        data.branchId = product.branchId;
        console.log(product);
        return this.productDomainService.registerCustomerSale(product);
      }),
      mergeMap((savedProduct) => savedProduct),
    );
  }

  execute(data: IProductEntity): Observable<IProductEntity> {
    console.log('data');
    console.log(data);

    return this.validateProductData(data).pipe(
      switchMap((validatedProduct) =>
        this.registercustomerSale(validatedProduct),
      ),
    );
  }
}

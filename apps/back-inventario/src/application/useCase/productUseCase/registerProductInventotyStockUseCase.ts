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
  CommandBus,
  IProductEntity,
  newProductInventoryCommand,
} from '../../../../../';
import { ProductDomainService } from './../../../domain/services/productServiceDomain';
export class registerProductInventoryStockUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<IProductEntity>,
    private readonly comandBus: CommandBus,
  ) {}

  private validateProductData(
    data: IProductEntity,
  ): Observable<IProductEntity> {
    const validatedProduct = new IProductEntity(data);

    return of(validatedProduct);
  }

  registerProductInventoryStock(
    data: IProductEntity,
  ): Observable<IProductEntity> {
    return this.validateProductData(data).pipe(
      mergeMap(() => {
        if (data.productInventoryStock < 0) {
          return throwError('Product stock cannot be negative');
        }

        return this.productDomainService.findByID(data.productId).pipe(
          catchError(() => throwError('Product not found')),
          map((product) => {
            if (!product) {
              throw new Error('Product not found');
            }

            product.productInventoryStock += data.productInventoryStock;
            const createBranchCommand = new newProductInventoryCommand(data);
            this.comandBus.execute(createBranchCommand);
            return this.productDomainService.registerProduct(product);
          }),
          mergeMap((savedProduct) => savedProduct),
        );
      }),
    );
  }

  execute(data: IProductEntity): Observable<IProductEntity> {
    return this.validateProductData(data).pipe(
      switchMap((validatedProduct) =>
        this.registerProductInventoryStock(validatedProduct),
      ),
      catchError((error) => throwError(`Validation error: ${error}`)),
    );
  }
}

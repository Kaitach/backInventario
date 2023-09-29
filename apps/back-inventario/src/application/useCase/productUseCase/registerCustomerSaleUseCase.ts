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
  newProductSalecommand,
} from '../../../../../';
import { ProductDomainService } from './../../../domain/services/productServiceDomain';
export class registerCustomerSaleUseCase {
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

  registercustomerSale(data: IProductEntity): Observable<IProductEntity> {
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
        const createBranchCommand = new newProductSalecommand(data);
        this.comandBus.execute(createBranchCommand);
        return this.productDomainService.registerCustomerSale(product);
      }),
      mergeMap((savedProduct) => savedProduct),
    );
  }

  execute(data: IProductEntity, id: string): Observable<IProductEntity> {
    return this.validateProductData(id, data).pipe(
      switchMap((validatedProduct) =>
        this.registercustomerSale(validatedProduct),
      ),
    );
  }
}

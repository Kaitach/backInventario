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
  newProductSaleReSellerCommand,
} from '../../../../../';
import { ProductDomainService } from './../../../domain/services/productServiceDomain';
export class RegisterResellerSaleUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<IProductEntity>,
    private readonly commandBus: CommandBus,
  ) {}

  private validateProductData(
    id: string,
    data: IProductEntity,
  ): Observable<IProductEntity> {
    data.productId = id;
    const validatedProduct = new IProductEntity(data);

    return of(validatedProduct);
  }

  registerResellerSale(data: IProductEntity): Observable<IProductEntity> {
    return this.productDomainService.findByID(data.productId as string).pipe(
      catchError(() => throwError('Product not found')),

      map((product) => {
        if (!product) {
          throw new Error('Product not found');
        }

        if (product.quantity < data.quantity) {
          throw new Error('Insufficient inventory');
        }

        product.quantity = +product.quantity - +data.quantity;
        const createBranchCommand = new newProductSaleReSellerCommand(product);
        this.commandBus.execute(createBranchCommand);
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

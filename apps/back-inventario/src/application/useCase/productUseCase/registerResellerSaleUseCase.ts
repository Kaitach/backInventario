/* eslint-disable prettier/prettier */
import { IProductEntity } from 'apps/back-inventario/src/domain';
import {
  Observable,
  catchError,
  map,
  mergeMap,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { ProductDomainService } from './../../../domain/services/productServiceDomain';

import { CommandBus } from 'apps/back-inventario/src/domain/services/eventService';
import { newProductSaleReSellerCommand } from 'apps/back-inventario/src/domain/events/commands/newProductSaleReSellerCommand';

export class RegisterResellerSaleUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<IProductEntity>,
    private readonly commandBus: CommandBus,
  ) {}

  private validateProductData(
    data: IProductEntity,
  ): Observable<IProductEntity> {
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

        if (product.productInventoryStock < data.productInventoryStock) {
          throw new Error('Insufficient inventory');
        }

        product.productInventoryStock =
          +product.productInventoryStock - +data.productInventoryStock;
        const createBranchCommand = new newProductSaleReSellerCommand(product);
        this.commandBus.execute(createBranchCommand);
        return this.productDomainService.registerResellerSale(product);
      }),
      mergeMap((savedProduct) => savedProduct),
    );
  }

  execute(data: IProductEntity): Observable<IProductEntity> {
    return this.validateProductData(data).pipe(
      switchMap((validatedProduct) =>
        this.registerResellerSale(validatedProduct),
      ),
      catchError((error) => throwError(`Validation error: ${error}`)),
    );
  }
}

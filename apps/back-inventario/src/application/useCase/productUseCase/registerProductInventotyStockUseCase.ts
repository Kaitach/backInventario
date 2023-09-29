/* eslint-disable prettier/prettier */
import { Observable, catchError, map, mergeMap, of, throwError } from 'rxjs';
import {
  CommandBus,
  IProductEntity,
  newProductInventoryCommand,
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

        return this.productDomainService.findByID(data.productId).pipe(
          catchError(() => throwError('Product not found')),
          map((product) => {
            if (!product) {
              throw new Error('Product not found');
            }

            product.quantity += data.quantity;
            const createBranchCommand = new newProductInventoryCommand(data);
            this.comandBus.execute(createBranchCommand);
            return this.productDomainService.registerProduct(product);
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

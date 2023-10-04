/* eslint-disable prettier/prettier */
import {
  Observable,
  catchError,
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
    console.log(data)
    return of(validatedProduct);
  }

  registerResellerSale(data: IProductEntity): Observable<IProductEntity> {
    const exchange = 'productInventory'
    const routingKey = 'newProductReSeller'
        this.commandBus.execute(exchange,routingKey, JSON.stringify(data))
        return this.productDomainService.registerResellerSale(data);
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

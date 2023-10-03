/* eslint-disable prettier/prettier */
import {
  Observable,
  of,
  switchMap
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
        
        const createBranchCommand = new newProductSalecommand(data);
        this.comandBus.execute(createBranchCommand);
        return this.productDomainService.registerCustomerSale(data);
      }
    ;
  

  execute(data: IProductEntity, id: string): Observable<IProductEntity> {
    return this.validateProductData(id, data).pipe(
      switchMap((validatedProduct) =>
        this.registercustomerSale(validatedProduct),
      ),
    );
  }
}

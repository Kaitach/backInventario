/* eslint-disable prettier/prettier */
import {
  Observable,
  
  
  of,
  switchMap,
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
  
      
     
        return this.productDomainService.registerCustomerSale(data);
  
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

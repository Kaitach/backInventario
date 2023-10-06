/* eslint-disable prettier/prettier */
import { Observable, mergeMap, of, throwError } from 'rxjs';
import {
  CommandBus,
  IProductEntity,
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
    branchId: string,
    product: IProductEntity[],
  ): void {


  


    product.forEach((product) => {
      const productExchange = 'productInventory';
      const productRoutingKey = 'productRegister'; 
      product.branchId = branchId
     

      this.comandBus.registerAddInventory(productExchange, productRoutingKey, product, branchId);
      return this.productDomainService.registerquantity(product);

    });


  }
      

    
  

  execute(data: IProductEntity[], id: string):void {

    return this.registerquantity(id, data);
  }
}

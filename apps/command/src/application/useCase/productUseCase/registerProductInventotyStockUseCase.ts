/* eslint-disable prettier/prettier */
import { Observable,  of } from 'rxjs';
import {
  CommandBus,
  IProductEntity,
  ProductDomainService,
} from '../../../../../shared';
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
      const productRoutingKey = 'updateProduct'; 
      product.branchId = branchId
     
      console.log('product')

      console.log(product)
      console.log('product')
      this.comandBus.registerAddInventory(productExchange, productRoutingKey, product, branchId);
       this.productDomainService.registerquantity(product);

    });


  }
      

    
  

  execute(data: IProductEntity[], id: string):void {

    return this.registerquantity(id, data);
  }
}

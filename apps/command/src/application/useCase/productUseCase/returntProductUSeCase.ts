/* eslint-disable prettier/prettier */
import { Observable,  of } from 'rxjs';
import {CommandBus, ProductDomainService, IProductEntity, SaleEntity } from '../../../../../shared';

export class returnquantityUseCase {
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

  returnquantity(
    branchId: string,
    product: IProductEntity[],
    saleId:SaleEntity
  ): void {


  


    product.forEach((product) => {
      const productExchange = 'productInventory';
      const productRoutingKey = 'new.productInventory'; 
      product.branchId = branchId
     

      this.comandBus.registerAddInventory(productExchange, productRoutingKey, product, branchId);
      this.productDomainService.returnquantity(product);

    },
 

    
    );
    const productExchange = 'productInventory';

    const productRoutingKey = 'productreturn'; 
 
     this.comandBus.returnAddInventory(productExchange, productRoutingKey, product, branchId, saleId);

  }
      

    
  

  execute(requestBody: { branchID: string, idSale: SaleEntity, product: IProductEntity[] }): void {
    console.log(requestBody)
    const { branchID, idSale, product } = requestBody;
    this.returnquantity(branchID, product, idSale);
  }
  
}

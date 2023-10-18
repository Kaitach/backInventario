/* eslint-disable prettier/prettier */
import { Observable, mergeMap, of, throwError } from 'rxjs';
import {
  CommandBus,
  IProductEntity,
} from '../../../../../';
import { ProductDomainService } from './../../../domain/services/productServiceDomain';
import { SaleEntity } from 'src/domain/entities/sale.entity';
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
      const productRoutingKey = 'productreturn'; 
      product.branchId = branchId
     

      this.comandBus.returnAddInventory(productExchange, productRoutingKey, product, branchId, saleId);
      return this.productDomainService.returnquantity(product);

    });


  }
      

    
  

  execute(requestBody: { branchID: string, idSale: SaleEntity, product: IProductEntity[] }): void {
    console.log(requestBody)
    const { branchID, idSale, product } = requestBody;
    this.returnquantity(branchID, product, idSale);
  }
  
}

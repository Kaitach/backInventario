/* eslint-disable prettier/prettier */
import { Observable, of } from 'rxjs';
import {
  CommandBus,
  IProductEntity,
  ProductDomainService,
  newProductCommand
} from '../../../../../';
export class RegisterProductUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<IProductEntity>,
    private readonly comandBus: CommandBus,
  ) {}

  private validateProductData(
    data: IProductEntity,
  ): Observable<IProductEntity> {
    data.quantity = 0;
    const validatedProduct = new IProductEntity(data);

    return of(validatedProduct);
  }

 
  

  registerProduct(data: any): Observable<IProductEntity> {
    const exchange = 'productInventory'
    const routingKey = 'productRegister'
    const dataentity = data as IProductEntity
    this.comandBus.execute(exchange,routingKey, JSON.stringify(data),dataentity.branchId )
    return  this.productDomainService.registerProduct(data)

  
  }

  execute(data: any): Observable<IProductEntity> {
    return this.registerProduct(data);
  }
}

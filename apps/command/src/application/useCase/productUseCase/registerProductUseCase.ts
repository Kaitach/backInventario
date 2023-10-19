/* eslint-disable prettier/prettier */
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import {
  CommandBus,
  IProductEntity,
  ProductDomainService,
} from '../../../../../shared';
export class RegisterProductUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<IProductEntity>,
    private readonly comandBus: CommandBus,
  ) {}

 
 
  

  registerProduct(data: any): Observable<IProductEntity> {
    const exchange = 'productInventory'
    const routingKey = 'productRegister'
    const dataentity = data as IProductEntity
    dataentity.productId =     uuidv4()

    this.comandBus.registerProduct(exchange,routingKey, data,dataentity.branchId )
    return  this.productDomainService.registerProduct(data)

  
  }

  execute(data: any): Observable<IProductEntity> {
    return this.registerProduct(data);
  }
}

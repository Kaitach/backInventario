/* eslint-disable prettier/prettier */

import { Observable} from 'rxjs';
import { ProductDomainService, IProductEntity } from '../../../../../shared';

export class registerquantityUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<IProductEntity>,
  ) {}



  registerquantity(
    id: string,
    data: IProductEntity,
  ): Observable<IProductEntity> {
 
    data.productId = id;

    const validatedProduct = new IProductEntity(data);

            return this.productDomainService.registerquantity(validatedProduct);
       
      }

  execute(data: IProductEntity, id: string): Observable<IProductEntity> {
 

    return this.registerquantity(id, data);
  }
}

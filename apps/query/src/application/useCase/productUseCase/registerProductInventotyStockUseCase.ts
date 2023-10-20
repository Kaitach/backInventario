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
 
   

            return this.productDomainService.registerquantity(data);
       
      }

  execute(data: IProductEntity, id: string): Observable<IProductEntity> {


    return this.registerquantity(id, data);
  }
}

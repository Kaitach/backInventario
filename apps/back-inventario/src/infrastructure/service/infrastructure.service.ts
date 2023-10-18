import { Injectable } from '@nestjs/common';
import { IProductEntity, ProductDomainService } from '../../domain';
import { Observable, of } from 'rxjs';
import { ISale } from '../../domain/interfaces/sale.interface';
@Injectable()
export class infrastructureServiceProduct implements   ProductDomainService<IProductEntity>  {
  returnquantity(): Observable<IProductEntity>{
    return of(null);  
  }

  registerProduct(): Observable<IProductEntity> {
    return of(null);    }
  registerquantity(): Observable<IProductEntity>{
    return of(null);  
  }
  registerCustomerSale(): Observable<ISale>{
    return of(null);  
  }
  registerResellerSale(): Observable<IProductEntity>{
   
    return of(null);  
  }
  findByID(): Observable<IProductEntity>{
 ;
    return of(null);  
  }
  getAll(): Observable<void[]>{
    ;
    return of(null);  
  }

}

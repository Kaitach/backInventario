import { Injectable } from '@nestjs/common';
import { ProductDomainService } from 'apps/back-inventario/src/domain/services/productServiceDomain';
import { IProductEntity } from '../../domain';
import { Observable, of } from 'rxjs';
import { ISale } from '../../domain/interfaces/sale.interface';
@Injectable()
export class infrastructureServiceProduct implements   ProductDomainService<IProductEntity>  {

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

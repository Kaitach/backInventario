import { Injectable } from '@nestjs/common';
import { ProductDomainService } from 'apps/back-inventario/src/domain/services/productServiceDomain';
import { IProductEntity } from '../../domain';
import { Observable, of } from 'rxjs';
@Injectable()
export class infrastructureServiceProduct implements   ProductDomainService<IProductEntity>  {

  registerProduct(data: IProductEntity): Observable<IProductEntity> {
    console.log('Registrado correctamente:', data);
    return of(null);    }
  registerquantity(data: IProductEntity): Observable<IProductEntity>{
    console.log('Registrado correctamente:', data);
    return of(null);  
  }
  registerCustomerSale(data:IProductEntity): Observable<IProductEntity>{
    console.log('Registrado correctamente:', data);
    return of(null);  
  }
  registerResellerSale(data: IProductEntity): Observable<IProductEntity>{
    console.log('Registrado correctamente:', data);
    return of(null);  
  }
  findByID(id: string): Observable<IProductEntity>{
    console.log('Registrado correctamente:' +id  );
    return of(null);  
  }
  getAll(): Observable<void[]>{
    console.log('Registrado correctamente:'   );
    return of(null);  
  }
}

/* eslint-disable prettier/prettier */
import { BranchDomainService, IBranchEntiy, IProductEntity, ProductDomainService } from 'apps/persistence/src';
import { Observable, of } from 'rxjs';


export class RegisterProductUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<IProductEntity>,
    private readonly branchDomainService: BranchDomainService<IBranchEntiy>,
  ) {}

  private validateProductData(
    data: IProductEntity,
  ): Observable<IProductEntity> {
    data.quantity = 0;
    const validatedProduct = new IProductEntity(data);

    return of(validatedProduct);
  }


  

  registerProduct(data: IProductEntity): Observable<IProductEntity> {
    data.quantity = 0
        return this.productDomainService.registerProduct(data);
     
   
  }

    
  

  execute(data: IProductEntity): Observable<IProductEntity> {
    this.validateProductData(data)
    return this.registerProduct(data);
  }
}


 

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

    const createBranchCommand = new newProductCommand(data);

    this.comandBus.execute(createBranchCommand);
   return  this.productDomainService.registerProduct(data)

  
  }

  execute(data: any): Observable<IProductEntity> {
    return this.registerProduct(data);
  }
}

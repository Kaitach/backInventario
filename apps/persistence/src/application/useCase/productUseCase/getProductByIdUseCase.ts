import { Injectable } from "@nestjs/common";
import { IProductEntity, ProductDomainService } from "apps/persistence/src/domain";
import { Observable } from "rxjs";

@Injectable()
export class getProductByIDUseCase {

  constructor(
    private readonly productService: ProductDomainService<IProductEntity>, 
  ) {} 

  execute(id: string): Observable<IProductEntity> {
    return this.productService.findByID(id);
  }

}
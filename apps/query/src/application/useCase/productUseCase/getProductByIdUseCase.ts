import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { IProductEntity, ProductDomainService } from "../../../../../shared";

@Injectable()
export class getProductByIDUseCase {

  constructor(
    private readonly productService: ProductDomainService<IProductEntity>, 
  ) {} 

  execute(id: string): Observable<IProductEntity> {
    return this.productService.findByID(id);
  }

}
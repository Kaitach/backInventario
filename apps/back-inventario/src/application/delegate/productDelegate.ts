/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { registerProductInventoryStockUseCase } from './../useCase/productUseCase/registerProductInventotyStockUseCase';

import { IProductEntity, ProductDomainService } from "../../domain";
import { registerCustomerSaleUseCase } from "../useCase/productUseCase/registerCustomerSaleUseCase";
import { RegisterProductUseCase } from "../useCase/productUseCase/registerProductUseCase";
import { RegisterResellerSaleUseCase } from '../useCase/productUseCase/registerResellerSaleUseCase';
import { IUseCase } from '../../domain/interfaces/IUseCase';


@Injectable()
export class productDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(
    private readonly productService: ProductDomainService<IProductEntity>
  ) { }

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  registerCustomerSale(): void {
    this.delegate = new registerCustomerSaleUseCase(
      this.productService
    );
  }

  registerProduct(): void {
    this.delegate = new RegisterProductUseCase(
      this.productService
    );
  }
  
  registerProductInventoryStock(): void {
    this.delegate = new registerProductInventoryStockUseCase(
      this.productService
    );
  }
  
  registerResellerSale(): void {
    this.delegate = new RegisterResellerSaleUseCase(
      this.productService
    );
  }
}

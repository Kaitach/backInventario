/* eslint-disable prettier/prettier */
import { Observable } from "rxjs";
import { registerProductInventoryStockUseCase } from './../useCase/productUseCase/registerProductInventotyStockUseCase';
import { CommandBus } from "apps/back-inventario/src/domain/services/eventService";

import { BranchDomainService, IBranchEntiy, IProductEntity, ProductDomainService } from "../../domain";
import { registerCustomerSaleUseCase } from "../useCase/productUseCase/registerCustomerSaleUseCase";
import { RegisterProductUseCase } from "../useCase/productUseCase/registerProductUseCase";
import { RegisterResellerSaleUseCase } from '../useCase/productUseCase/registerResellerSaleUseCase';
import { IUseCase } from '../../domain/interfaces/IUseCase';


export class productDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(
    private readonly productService: ProductDomainService<IProductEntity>,private readonly comandBus: CommandBus, private readonly branchDomanService: BranchDomainService<IBranchEntiy>
  ) { }

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  registerCustomerSale(): void {
    this.delegate = new registerCustomerSaleUseCase(
      this.productService,
      this.comandBus
    );
  }

  registerProduct(): void {
    this.delegate = new RegisterProductUseCase(
      this.productService,
      this.branchDomanService,
      this.comandBus
    );
  }
  
  registerProductInventoryStock(): void {
    this.delegate = new registerProductInventoryStockUseCase(
      this.productService,
      this.comandBus
    );
  }
  
  registerResellerSale(): void {
    this.delegate = new RegisterResellerSaleUseCase(
      this.productService,
      this.comandBus
    );
  }
}

import {  getProductByIDUseCase } from './../useCase/productUseCase/getProductByIdUseCase';
import { Observable } from 'rxjs';
import { registerquantityUseCase } from './../useCase/productUseCase/registerProductInventotyStockUseCase';


import { registerCustomerSaleUseCase } from '../useCase/productUseCase/registerCustomerSaleUseCase';
import { RegisterProductUseCase } from '../useCase/productUseCase/registerProductUseCase';
import { RegisterResellerSaleUseCase } from '../useCase/productUseCase/registerResellerSaleUseCase';
import { IUseCase, ProductDomainService, IProductEntity, BranchDomainService, IBranchEntiy } from '../../../../shared';

export class productDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(
    private readonly productService: ProductDomainService<IProductEntity>,
    private readonly branchDomanService: BranchDomainService<IBranchEntiy>,
  ) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  registerCustomerSale(): any {
    this.delegate = new registerCustomerSaleUseCase(
      this.productService,
    );
  }

  registerProduct(): void {
    this.delegate = new RegisterProductUseCase(
      this.productService,
      this.branchDomanService,
    );
  }

  registerquantity(): any {
    this.delegate = new registerquantityUseCase(
      this.productService,
    );
  }

  registerResellerSale(): any {
    this.delegate = new RegisterResellerSaleUseCase(
      this.productService,
    );
  }

  getProductByID(): void {
    this.delegate = new getProductByIDUseCase(
      this.productService,
    );
  }
}

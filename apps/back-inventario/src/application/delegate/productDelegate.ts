import { Observable } from 'rxjs';
import { CommandBus } from '../../../../';
import { registerquantityUseCase } from './../useCase/productUseCase/registerProductInventotyStockUseCase';

import {
  IProductEntity,
  ProductDomainService
} from '../../domain';
import { IUseCase } from '../../domain/interfaces/IUseCase';
import { registerCustomerSaleUseCase } from '../useCase/productUseCase/registerCustomerSaleUseCase';
import { RegisterProductUseCase } from '../useCase/productUseCase/registerProductUseCase';
import { RegisterResellerSaleUseCase } from '../useCase/productUseCase/registerResellerSaleUseCase';
import { returnquantityUseCase } from '../useCase/productUseCase/returntProductUSeCase';

export class productDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(
    private readonly productService: ProductDomainService<IProductEntity>,
    private readonly comandBus: CommandBus,
  ) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  registerCustomerSale(): void {
    this.delegate = new registerCustomerSaleUseCase(
      this.comandBus,

      this.productService,
    );
  }

  registerProduct(): void {
    this.delegate = new RegisterProductUseCase(
      this.productService,
      this.comandBus,
    );
  }

  registerquantity(): void {
    this.delegate = new registerquantityUseCase(
      this.productService,
      this.comandBus,
    );
  }

  registerResellerSale(): void {
    this.delegate = new RegisterResellerSaleUseCase(
      this.productService,
      this.comandBus,
    );
  }


  returnquantityUseCase(): void {
    this.delegate = new returnquantityUseCase(
      this.productService,
      this.comandBus,
    );
  }
}

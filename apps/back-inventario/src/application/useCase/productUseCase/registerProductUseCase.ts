/* eslint-disable prettier/prettier */
import {
  ProductDomainService,
  IProductEntity,
  BranchDomainService,
  IBranchEntiy,
} from 'apps/back-inventario/src/domain';
import { newProductCommand } from 'apps/back-inventario/src/domain/events/commands/newProductCommand';
import { CommandBus } from 'apps/back-inventario/src/domain/services/eventService';

import { Observable, throwError, switchMap, catchError, of, map } from 'rxjs';

export class RegisterProductUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<IProductEntity>,
    private readonly branchDomainService: BranchDomainService<IBranchEntiy>,
    private readonly comandBus: CommandBus,
  ) {}

  private validateProductData(
    data: IProductEntity,
  ): Observable<IProductEntity> {
    const validatedProduct = new IProductEntity(data);

    return of(validatedProduct);
  }

  private validateBranchExistence(branchId: string): Observable<boolean> {
    return this.branchDomainService.findBranchById(branchId).pipe(
      map((branch) => !!branch),
      catchError(() => of(false)),
    );
  }

  registerProduct(data: IProductEntity): Observable<IProductEntity> {
    const createBranchCommand = new newProductCommand(data);
    this.comandBus.execute(createBranchCommand);
    return this.validateBranchExistence(data.branchID).pipe(
      switchMap(() => this.validateProductData(data)),
      switchMap(() => this.productDomainService.registerProduct(data)),

      catchError((error) => throwError(`Registration error: ${error}`)),
    );
  }

  execute(data: IProductEntity): Observable<IProductEntity> {
    return this.validateProductData(data).pipe(
      switchMap((validatedProduct) => this.registerProduct(validatedProduct)),
      catchError((error) => throwError(`Validation error: ${error}`)),
    );
  }
}

/* eslint-disable prettier/prettier */
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';
import {
  BranchDomainService,
  CommandBus,
  IBranchEntiy,
  IProductEntity,
  ProductDomainService,
  newProductCommand,
} from '../../../../../';
export class RegisterProductUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<IProductEntity>,
    private readonly branchDomainService: BranchDomainService<IBranchEntiy>,
    private readonly comandBus: CommandBus,
  ) {}

  private validateProductData(
    data: IProductEntity,
  ): Observable<IProductEntity> {
    data.quantity = 0;
    const validatedProduct = new IProductEntity(data);

    return of(validatedProduct);
  }

  private validateBranchExistence(branchId: string): Observable<boolean> {
    return this.branchDomainService.findBranchById(branchId).pipe(
      switchMap((branchExists) => {
        if (!branchExists) {
          return throwError('La sucursal no existe.');
        }
  }))
}

  registerProduct(data: IProductEntity): Observable<IProductEntity> {
    const createBranchCommand = new newProductCommand(data);
    this.comandBus.execute(createBranchCommand);
    return this.validateBranchExistence(data.branchId).pipe(
      switchMap(() => this.validateProductData(data)),
      switchMap(() => this.productDomainService.registerProduct(data)),

      catchError((error) => throwError(`Registration error: ${error}`)),
    );
  }

  execute(data: IProductEntity): Observable<IProductEntity> {
    return this.registerProduct(data);
  }
}

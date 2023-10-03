/* eslint-disable prettier/prettier */
import { BranchDomainService, IProductEntity,ProductDomainService,IBranchEntiy } from 'apps/persistence/src';
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';

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

  private validateBranchExistence(branchId: string): Observable<boolean> {
    return this.branchDomainService.findBranchById(branchId).pipe(
      map((branch) => !!branch),
      catchError(() => of(false)),
    );
  }

  registerProduct(data: IProductEntity): Observable<IProductEntity> {

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

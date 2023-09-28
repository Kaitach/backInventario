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

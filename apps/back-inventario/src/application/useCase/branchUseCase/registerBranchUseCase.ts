/* eslint-disable prettier/prettier */
import {
  BranchDomainService,
  IBranchEntiy,
} from 'apps/back-inventario/src/domain';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { CreateBranchCommand } from 'apps/back-inventario/src/domain/events/commands/newBranchCommand';
import { CommandBus } from 'apps/back-inventario/src/domain/services/eventService';

export class registerBranchUseCase {
  constructor(
    private readonly branchService: BranchDomainService<IBranchEntiy>,
    private readonly comandBus: CommandBus,
  ) {}

  private validateBranchData(data: IBranchEntiy): Observable<IBranchEntiy> {
    const validatedUser = new IBranchEntiy(data);

    return of(validatedUser);
  }

  registerBranch(data: IBranchEntiy): Observable<IBranchEntiy> {
    return this.validateBranchData(data).pipe(
      switchMap(() => {
        const createBranchCommand = new CreateBranchCommand(data);
        this.comandBus.execute(createBranchCommand);
        return this.branchService.RegisterBranch(data);
      }),
      catchError((error) => {
        return throwError(`Error de validación: ${error}`);
      }),
    );
  }

  execute(data: IBranchEntiy): Observable<IBranchEntiy> {
    return this.validateBranchData(data).pipe(
      switchMap((validatedProduct) => this.registerBranch(validatedProduct)),
      catchError((error) => throwError(`Validation error: ${error}`)),
    );
  }
}

/* eslint-disable prettier/prettier */
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import {
  BranchDomainService,
  CreateBranchCommand,
  IBranchEntiy,
} from '../../../../../';
import { CommandBus } from '../../../domain/services';
import { IBranchRegister } from 'apps/back-inventario/src/domain/interfaces/branchBaseDomainInterface';
export class registerBranchUseCase {
  constructor(
    private readonly branchService: BranchDomainService<IBranchEntiy>,
    private readonly comandBus: CommandBus,
  ) {}

  private validateBranchData(
    data: IBranchEntiy,
  
  ): Observable<IBranchEntiy> {
    const validatedUser = new IBranchEntiy(data);

    return of(validatedUser);
  }

  registerBranch(data: IBranchRegister): Observable<void> {
  const newBranch  = {
name:  data.name,
location: data.location.city + "," + data.location.country
    } as IBranchEntiy
    return this.validateBranchData(newBranch).pipe(
      switchMap((validatedBranch) => {
        const createBranchCommand = new CreateBranchCommand(validatedBranch);
        this.comandBus.execute(createBranchCommand);
        return this.branchService.RegisterBranch(validatedBranch);
      }),
      catchError((error) => {
        return throwError(`Error de validación: ${error}`);
      }),
    );
  }

  execute(data: IBranchRegister): Observable<void> {
    return this.registerBranch( data);
    
  }
}

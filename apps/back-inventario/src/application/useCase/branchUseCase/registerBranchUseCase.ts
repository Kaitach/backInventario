/* eslint-disable prettier/prettier */
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import {
  BranchDomainService,
  CreateBranchCommand,
  IBranchEntiy,
} from '../../../../../';
import { CommandBus } from '../../../domain/services';
import { IBranchRegister } from 'apps/back-inventario/src/domain/interfaces/branchBaseDomainInterface';
import { blue } from 'colorette';
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
    const exchange = 'branch'
    const routingKey = 'BranchRegister'
    return this.validateBranchData(newBranch).pipe(
      switchMap((validatedBranch) => {
        this.comandBus.execute(exchange,routingKey, JSON.stringify(data))
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

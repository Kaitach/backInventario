/* eslint-disable prettier/prettier */
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';
import { BranchDomainService, CommandBus, IBranchEntiy, IBranchRegister } from '../../../../../shared';

export class registerBranchUseCase {
  constructor(
    private readonly branchService: BranchDomainService<IBranchEntiy>,
    private readonly comandBus: CommandBus,
  ) {}

  private validateBranchData(
    data: IBranchEntiy,
  
  ): Observable<IBranchEntiy> {
    const validatedUser = new IBranchEntiy(data);
    validatedUser.branchId = uuidv4()
    console.log(validatedUser)
       const exchange = 'branch'
    const routingKey = 'BranchRegister'
    this.comandBus.registerBranch(exchange,routingKey, validatedUser, validatedUser.branchId)
    this.branchService.RegisterBranch(validatedUser);
    return of(validatedUser);
  }

  registerBranch(data: IBranchRegister): any {
  const newBranch  = {
name:  data.name,
location: data.location.city + "," + data.location.country
    } as IBranchEntiy
    const exchange = 'branch'
    const routingKey = 'BranchRegister'
    this.validateBranchData(newBranch)
  }

  execute(data: IBranchRegister): Observable<void> {
    return this.registerBranch( data);
    
  }
}

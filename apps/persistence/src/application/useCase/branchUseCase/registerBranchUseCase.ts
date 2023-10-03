/* eslint-disable prettier/prettier */
import { BranchDomainService, IBranchEntiy } from 'apps/persistence/src';
import { Observable, of } from 'rxjs';

export class registerBranchUseCase {
  constructor(
    private readonly branchService: BranchDomainService<IBranchEntiy>,
  ) {}

  private validateBranchData(
    data: IBranchEntiy,
  
  ): Observable<IBranchEntiy> {
    const validatedUser = new IBranchEntiy(data);

    return of(validatedUser);
  }

  registerBranch(data: IBranchEntiy): Observable<IBranchEntiy> {
 
        return this.branchService.RegisterBranch(data);
   
    
  }

  execute(data: IBranchEntiy): Observable<IBranchEntiy> {
    return this.registerBranch( data);
  }
}

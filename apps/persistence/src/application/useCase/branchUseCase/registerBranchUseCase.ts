/* eslint-disable prettier/prettier */
import { BranchDomainService, IBranchEntiy } from 'apps/persistence/src';
import { Observable,  } from 'rxjs';

export class registerBranchUseCase {
  constructor(
    private readonly branchService: BranchDomainService<IBranchEntiy>,
  ) {}




  registerBranch(data: IBranchEntiy): Observable<IBranchEntiy> {




        return this.branchService.RegisterBranch(data);
   
    
  }

  execute(data: any): Observable<IBranchEntiy> {
    return this.registerBranch( data);
  }
}

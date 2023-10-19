/* eslint-disable prettier/prettier */
import { BranchDomainService, IBranchEntiy } from '../../../../../shared';

export class registerBranchUseCase {
  constructor(
    private readonly branchService: BranchDomainService<IBranchEntiy>,
  ) {}




  registerBranch(data: IBranchEntiy): void {




         this.branchService.RegisterBranch(data);
   
    
  }

  execute(data: any): void{
    this.registerBranch( data);
  }
}

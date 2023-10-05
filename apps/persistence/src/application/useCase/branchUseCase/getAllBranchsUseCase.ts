import { Injectable } from "@nestjs/common";
import { BranchDomainService, IBranchEntiy } from "apps/persistence/src/domain";
import { Observable } from "rxjs";

@Injectable()
export class getallBranchUseCase {

  constructor(
    private readonly branchDomainService: BranchDomainService<IBranchEntiy>, 
  ) {} 

  execute(): Observable<IBranchEntiy[]> {
    return this.branchDomainService.getAllBranch();
  }

}
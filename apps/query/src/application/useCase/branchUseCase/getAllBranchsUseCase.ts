import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { BranchDomainService, IBranchEntiy } from "../../../../../shared";

@Injectable()
export class getallBranchUseCase {

  constructor(
    private readonly branchDomainService: BranchDomainService<IBranchEntiy>, 
  ) {} 

  execute(): Observable<IBranchEntiy[]> {
    return this.branchDomainService.getAllBranch();
  }

}
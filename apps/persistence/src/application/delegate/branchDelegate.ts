/* eslint-disable prettier/prettier */
import { Observable } from "rxjs";

import { IUseCase } from '../../domain/interfaces/IUseCase';
import { BranchDomainService, IBranchEntiy } from "../../domain";
import { registerBranchUseCase } from "../useCase/branchUseCase/registerBranchUseCase";
import { getallBranchUseCase } from "../useCase/branchUseCase/getAllBranchsUseCase";


export class BranchDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(
    private readonly BranchService: BranchDomainService<IBranchEntiy>
  ) { }

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  registerBranch(): void {
    this.delegate = new registerBranchUseCase(
      this.BranchService
    );
  }

  getAllBranch():void {
    this.delegate = new getallBranchUseCase(
      this.BranchService
    )
  }

}

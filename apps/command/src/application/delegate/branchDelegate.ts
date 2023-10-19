/* eslint-disable prettier/prettier */
import { Observable } from "rxjs";


import { registerBranchUseCase } from "../useCase/branchUseCase/registerBranchUseCase";
import { IUseCase, BranchDomainService, IBranchEntiy, CommandBus } from "../../../../shared";


export class BranchDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(
    private readonly BranchService: BranchDomainService<IBranchEntiy>,  private readonly eventBus: CommandBus
  ) { }

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  registerBranch(): void {
    this.delegate = new registerBranchUseCase(
      this.BranchService,
      this.eventBus
    );
  }

}

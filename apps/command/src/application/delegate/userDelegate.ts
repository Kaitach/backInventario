/* eslint-disable prettier/prettier */

import {UserDomainService, IUserEntity,  CommandBus, IUseCase, BranchDomainService, IBranchEntiy } from "../../../../shared";
import { registeruserUseCase } from "../useCase/userUseCase/registerUserUseCase";


export class userDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(
    private readonly userService: UserDomainService<IUserEntity>,  private readonly comandBus: CommandBus, private readonly BranchService: BranchDomainService<IBranchEntiy>
  ) { }

  execute(...args: any[]) {
    return this.delegate.execute(...args);
  }

  registerUser(): void {
    this.delegate = new registeruserUseCase(
      this.userService,
      this.comandBus
    );
  }

}

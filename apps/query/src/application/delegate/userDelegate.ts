/* eslint-disable prettier/prettier */


import { IUseCase, BranchDomainService, IBranchEntiy,  UserDomainService, IUserEntity  } from "../../../../shared";
import { registeruserUseCase } from "../useCase/userUseCase/registerUserUseCase";


export class userDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(
    private readonly userService: UserDomainService<IUserEntity>, private readonly BranchService: BranchDomainService<IBranchEntiy>
  ) { }

  execute(...args: any[]) {
    return this.delegate.execute(...args);
  }

  registerUser(): void {
    this.delegate = new registeruserUseCase(
      this.userService,
      this.BranchService,
    );
  }

}

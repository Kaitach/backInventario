/* eslint-disable prettier/prettier */

import {  BranchDomainService, IBranchEntiy, IUserEntity, UserDomainService } from "../../domain";
import { IUseCase } from '../../domain/interfaces/IUseCase';
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

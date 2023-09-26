/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

import {  IUserEntity, UserDomainService } from "../../domain";
import { IUseCase } from '../../domain/interfaces/IUseCase';
import { registeruserUseCase } from "../useCase/userUseCase/registerUserUseCase";


@Injectable()
export class userDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(
    private readonly userService: UserDomainService<IUserEntity>
  ) { }

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  registerUser(): void {
    this.delegate = new registeruserUseCase(
      this.userService
    );
  }

}

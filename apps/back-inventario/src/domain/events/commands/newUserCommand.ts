/* eslint-disable prettier/prettier */
import {  IUserEntity } from "../../entities";
export class CreateUserCommand {
    constructor(public readonly userData: IUserEntity) {}
  }
  
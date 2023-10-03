/* eslint-disable prettier/prettier */
import { IRegisterUser } from "../../interfaces/registerUserInterface";
export class CreateUserCommand {
    constructor(public readonly userData: IRegisterUser) {}
  }
  
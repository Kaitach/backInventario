/* eslint-disable prettier/prettier */

import { IRegisterUser }from "../../../../../../shared";

export class RegisterUserDto  implements IRegisterUser {
  email: string;
  password: string;
  role: string;
  name: {
    firstName:string ,
    lastName: string
  }
  branchId: string;
}

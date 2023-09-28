/* eslint-disable prettier/prettier */

import { IUser } from "../interfaces";
import { IdValueObject, RoleUserValueObject, UserEmailValueObject, UserNameValueObject, UserPasswordValueObject } from "../value-objects";

export class IUserEntity  {
    userId: string;
    username: string;
    userPassword: string;
    userEmail: string;
    userRole: string;
    branchID: string
    constructor(data: IUser ) {
      
      this.username = new UserNameValueObject(
        data.username
      ).valueOf();
      this.userPassword = new UserPasswordValueObject(data.userPassword).valueOf();
      this.userEmail = new UserEmailValueObject(data.userEmail).valueOf();
      this.userRole = new RoleUserValueObject(data.userRole).valueOf();
      this.branchID = new IdValueObject(data.branchID).valueOf()
    }
  }

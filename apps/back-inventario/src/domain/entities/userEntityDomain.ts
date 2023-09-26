/* eslint-disable prettier/prettier */

import { UUID } from "crypto";
import { IUser } from "../interfaces/userInterfaceDomain";

export class IUserEntity implements IUser {
    userId: UUID;
    username: string;
    userPassword: string;
    userEmail: string;
    userRole: string;
  
    constructor(
      username: string,
      userPassword: string,
      userEmail: string,
      userRole: string
    ) {
      this.username = username;
      this.userPassword = userPassword;
      this.userEmail = userEmail;
      this.userRole = userRole;
    }
  
  }
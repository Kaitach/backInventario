/* eslint-disable prettier/prettier */
import { UserTypeOrmEntity } from "../../../database";

export class RegisterUserDto extends UserTypeOrmEntity {

    userEmail: string;
    userPassword: string;
    userRole: string;
    username: string;
    branchID: string

}
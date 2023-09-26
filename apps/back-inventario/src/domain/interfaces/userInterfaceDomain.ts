/* eslint-disable prettier/prettier */
import { IdValueObject } from "../value-objects/id-uuid-value";
import { UserEmailValueObject } from "../value-objects/user/user-email.value-object";
import { UserNameValueObject } from "../value-objects/user/user-name.value-object";
import { UserPasswordValueObject } from "../value-objects/user/user-password.value-objects";
import { RoleUserValueObject } from "../value-objects/user/user-role.value-object";

/* eslint-disable prettier/prettier */
export interface IUser  {
    userId: IdValueObject | string;
    username: string | UserNameValueObject;
    userPassword: string | UserPasswordValueObject;
    userEmail: string | UserEmailValueObject;
    userRole: string | RoleUserValueObject; 
}
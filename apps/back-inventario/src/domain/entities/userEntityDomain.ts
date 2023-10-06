/* eslint-disable prettier/prettier */

import { IUser } from '../interfaces';
import {
  IdValueObject,
  RoleUserValueObject,
  UserNameValueObject,
  emailValueObject,
  passwordValueObject,
} from '../value-objects';
import { v4 as uuidv4 } from 'uuid';

export class IUserEntity {
  id: string;
  name: string;
  password: string;
  email: string;
  role: string;
  branchId: string;
  constructor(data: IUser) {
    if (data.id)
    this.id = new IdValueObject(data.id).valueOf();
  else this.id = new IdValueObject(uuidv4()).valueOf();
    this.name = new UserNameValueObject(data.name).valueOf();
    this.password = new passwordValueObject(data.password).valueOf();
    this.email = new emailValueObject(data.email).valueOf();
    this.role = new RoleUserValueObject(data.role).valueOf();
    this.branchId = new IdValueObject(data.branchId).valueOf();
  }
}

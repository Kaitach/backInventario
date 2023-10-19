/* eslint-disable prettier/prettier */

import { Location } from '../interfaces/LocationInterface';
import { IBranch } from '../interfaces/branchInterfaceDomain';
import { IdValueObject, locationValueObject, nameValueObject } from '../value-objects';
import { IProductEntity } from './productEntityDomain';
import { IUserEntity } from './userEntityDomain';
import { v4 as uuidv4 } from 'uuid';

export class IBranchEntiy implements IBranch {
  branchId: string;
  name: string;
  location: string ;
  products: IProductEntity[];
  users: IUserEntity[];

  constructor(data: IBranch) {
    if (data.branchId)
    this.branchId = new IdValueObject(data.branchId).valueOf();
  else this.branchId = new IdValueObject(uuidv4()).valueOf();
    this.name = new nameValueObject(data.name).valueOf();
    this.location = new locationValueObject(
      data.location ,
    ).valueOf();
  }
}

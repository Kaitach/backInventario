/* eslint-disable prettier/prettier */

import { Location } from '../interfaces/LocationInterface';
import { IBranch } from '../interfaces/branchInterfaceDomain';
import { locationValueObject, nameValueObject } from '../value-objects';
import { IProductEntity } from './productEntityDomain';
import { IUserEntity } from './userEntityDomain';

export class IBranchEntiy implements IBranch {
  branchId: string;
  name: string;
  location: string ;
  products: IProductEntity[];
  users: IUserEntity[];

  constructor(data: IBranch) {
    this.name = new nameValueObject(data.name).valueOf();
    this.location = new locationValueObject(
      data.location ,
    ).valueOf();
  }
}

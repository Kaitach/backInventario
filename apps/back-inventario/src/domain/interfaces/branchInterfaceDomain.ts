/* eslint-disable prettier/prettier */
import { BranchNameValueObject } from '../value-objects/branch/branch-name.value-object';
import { IdValueObject } from '../value-objects/id-uuid-value';
import { IProduct } from './productInterfaceDomain';
import { IUser } from './userInterfaceDomain';

type Location = {
  country: string;
  city: string;
};
export interface IBranch {
    branchID: IdValueObject | string;
    branchName: BranchNameValueObject | string ;
    branchLocation: string | Location;
    branchProducts: IProduct[];
    branchEmployees: IUser[];
  }
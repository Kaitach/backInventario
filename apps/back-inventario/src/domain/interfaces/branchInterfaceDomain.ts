/* eslint-disable prettier/prettier */

import { IProduct } from './productInterfaceDomain';
import { IUser } from './userInterfaceDomain';

type Location = {
  country: string;
  city: string;
};
export interface IBranch {
  branchID: string;
  branchName: string;
  branchLocation: string | Location;
  branchProducts: IProduct[];
  branchEmployees: IUser[];
}

/* eslint-disable prettier/prettier */

import { IProduct } from './productInterfaceDomain';
import { IUser } from './userInterfaceDomain';


export interface IBranch {
  branchId: string;
  name: string;
  location: string ;
  products: IProduct[];
  users: IUser[];
}

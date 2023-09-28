/* eslint-disable prettier/prettier */

import { IProductEntity } from "./productEntityDomain";
import { IUserEntity } from "./userEntityDomain";
import { IBranch } from "../interfaces/branchInterfaceDomain";
import { Location } from "../interfaces/LocationInterface";
import { BranchLocationValueObject, BranchNameValueObject } from "../value-objects";

export class IBranchEntiy implements IBranch {

  
    branchID: string;
    branchName:  string;
    branchLocation: string  | Location ;
    branchProducts: IProductEntity[];
    branchEmployees: IUserEntity[]; 

    constructor(   data: IBranch) {
        this.branchName = new BranchNameValueObject(data.branchName).valueOf();
        this.branchLocation = new BranchLocationValueObject(data.branchLocation as Location).valueOf();
      }
} 
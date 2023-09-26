/* eslint-disable prettier/prettier */

import { IProductEntity } from "./productEntityDomain";
import { IUserEntity } from "./userEntityDomain";
import { IBranch } from "../interfaces/branchInterfaceDomain";
import { Location } from "../interfaces/LocationInterface";

export class IBranchEntiy implements IBranch {

  
    branchID: string;
    branchName:  string;
    branchLocation: string  | Location ;
    branchProducts: IProductEntity[];
    branchEmployees: IUserEntity[]; 

    constructor(      branchLocation: string,
      branchName: string,
      branchProducts: [],
      branchEmployees: []) {
        this.branchName = branchName;
        this.branchLocation = branchLocation;
        this.branchProducts = branchProducts;
        this.branchEmployees = branchEmployees;
      }
} 
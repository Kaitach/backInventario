/* eslint-disable prettier/prettier */
import { IBranchEntiy } from "../../entities";
export class CreateBranchCommand {
  
    constructor(public readonly branchData: IBranchEntiy) {}
  }
  
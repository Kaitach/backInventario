/* eslint-disable prettier/prettier */
import { BranchTypeOrmEntity } from "../../../database";

export class RegisterBranchDto extends BranchTypeOrmEntity {
    branchName: string;
    branchLocation: string ;

}
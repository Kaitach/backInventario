import { IBranchRegister } from './../../../../domain/interfaces/branchBaseDomainInterface';
/* eslint-disable prettier/prettier */

export class RegisterBranchDto implements IBranchRegister  {
  name: string;
  location: {
    city: string,
    country: string
  }
}

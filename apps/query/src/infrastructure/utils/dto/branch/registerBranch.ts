/* eslint-disable prettier/prettier */

import { IBranchRegister } from "../../../../../../shared";

export class RegisterBranchDto implements IBranchRegister  {
  name: string;
  location: {
    city: string,
    country: string
  }
}

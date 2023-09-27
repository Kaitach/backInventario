/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ValueObjectException } from "apps/shared";
import { ValueObjectBase } from "apps/shared/bases";
import { isName } from "apps/shared/validations";

export class BranchNameValueObject extends ValueObjectBase<string> {
  MIN_EXTENSION = 3;
  MAX_EXTENSION = 40;


  validateData(): void {
    this.minExtension();
    this.maxExtension();
  }

  private minExtension(): void {
    if (this.value.length < this.MIN_EXTENSION) {
  
      throw new ValueObjectException(`Branch Name must be at least ${this.MIN_EXTENSION} characters`,)

    }
  }

  private maxExtension(): void {
    if (this.value.length > this.MAX_EXTENSION) {
   
      throw new ValueObjectException(`Branch Name must be maximum ${this.MAX_EXTENSION} characters`,)

    }
  }


}

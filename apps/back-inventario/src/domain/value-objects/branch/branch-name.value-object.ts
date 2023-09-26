/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ValueObjectBase } from "apps/shared/bases";
import { IErrorValueObject } from "apps/shared/interface";
import { isName } from "apps/shared/validations";

export class BranchNameValueObject extends ValueObjectBase<string> {
  MIN_EXTENSION = 3;
  MAX_EXTENSION = 40;
  errorMessage: string;
  errorsTrue = false;

  validateData(): void {
    this.minExtension();
    this.maxExtension();
  }

  private minExtension(): void {
    if (this.value.length < this.MIN_EXTENSION) {
      this.errorsTrue = true;
      this.errorMessage = `Branch Name must be at least ${this.MIN_EXTENSION} characters`;
    }
  }

  private maxExtension(): void {
    if (this.value.length > this.MAX_EXTENSION) {
      this.errorsTrue = true;
      this.errorMessage = `Branch Name must be maximum ${this.MAX_EXTENSION} characters`;
    }
  }

  errorValidate(): boolean {
    return this.errorsTrue;
  }
}

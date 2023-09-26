/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ValueObjectBase } from "apps/shared/bases";
import { IErrorValueObject } from "apps/shared/interface";

type UserName = {
  userName: string;
  userLastName: string;
};

export class UserNameValueObject extends ValueObjectBase<string> {
  MIN_LENGTH = 3;
  MAX_LENGTH = 100;
  errorMessage: string;
  errorsTrue = false;
  validateData(): void {
    this.minLength();
    this.maxLength();
  }

  private minLength(): void {
    if (this.value.length < this.MIN_LENGTH) {
      this.errorsTrue = true;
      this.errorMessage = `User Name must be at least ${this.MIN_LENGTH} characters`;

    }
  }

  private maxLength(): void {
    if (this.value.length > this.MAX_LENGTH) {

      this.errorsTrue = true;
      this.errorMessage = `User Name must be maximum ${this.MAX_LENGTH} characters`;
    }
  }
  errorValidate(): boolean {
    return this.errorsTrue;
  }
}
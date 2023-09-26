/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ValueObjectBase } from "apps/shared/bases";
import { IErrorValueObject } from "apps/shared/interface";
import { isName } from "apps/shared/validations";

export class UserEmailValueObject extends ValueObjectBase<string> {
  errorMessage: string;
  errorsTrue = false;
  REGEX = '^[^@]+@[^@]+\\.[a-zA-Z]{2,}$';

  validateData(): void {
    this.emailPattern();
  }

  emailPattern(): void {
    if (this.value && !this.isValidEmail(this.value)) {
      this.errorsTrue = true;
      this.errorMessage = 'User Email is not a valid email';
    }
  }

  errorValidate(): boolean {
    return this.errorsTrue;
  }

  private isValidEmail(email: string): boolean {
    const regex = new RegExp(this.REGEX);
    return regex.test(email);
  }
}
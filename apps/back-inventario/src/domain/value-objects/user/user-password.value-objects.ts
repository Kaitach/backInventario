/* eslint-disable prettier/prettier */
import { ValueObjectBase } from "apps/shared/bases";

export class UserPasswordValueObject extends ValueObjectBase<string> {
  MIN_LENGTH = 8;
  MAX_LENGTH = 16;
  REGEX = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,16}$/;
  errorMessage: string;
  errorsTrue = false;
  validateData(): boolean {
    
    return this.minPasswordLength() && this.maxPasswordLength() && this.passwordPattern();
  }

  minPasswordLength(): boolean {
    if (this.value.length < this.MIN_LENGTH) {
      this.errorsTrue = true;
      this.errorMessage = `User Password must be at least ${this.MIN_LENGTH} characters`;
 
      return false;
    }
    return true;
  }

  maxPasswordLength(): boolean {
    if (this.value.length > this.MAX_LENGTH) {
 
      this.errorsTrue = true;
      this.errorMessage = `User Password must be maximum ${this.MAX_LENGTH} characters`;
      return false;
      
    }
    return true;
  }

  passwordPattern(): boolean {
    if (!this.value.match(this.REGEX)) {
   
      this.errorsTrue = true;
      this.errorMessage = 'User Password is not a valid pattern';
      return false;
    }
    return true;
  }
    errorValidate(): boolean {
    return this.errorsTrue;
  }
}

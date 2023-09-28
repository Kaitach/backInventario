/* eslint-disable prettier/prettier */
import { ValueObjectException } from '../../../../../shared';

import { ValueObjectBase } from '../../../../../shared';

export class UserPasswordValueObject extends ValueObjectBase<string> {
  MIN_LENGTH = 8;
  MAX_LENGTH = 16;
  REGEX = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,16}$/;

  validateData(): boolean {
    return (
      this.minPasswordLength() &&
      this.maxPasswordLength() &&
      this.passwordPattern()
    );
  }

  minPasswordLength(): boolean {
    if (this.value.length < this.MIN_LENGTH) {
      throw new ValueObjectException(
        `User Password must be at least ${this.MIN_LENGTH} characters`,
      );
    }
    return true;
  }

  maxPasswordLength(): boolean {
    if (this.value.length > this.MAX_LENGTH) {
      throw new ValueObjectException(
        `User Password must be maximum ${this.MAX_LENGTH} characters`,
      );
    }
    return true;
  }

  passwordPattern(): boolean {
    if (!this.value.match(this.REGEX)) {
      throw new ValueObjectException('User Password is not a valid pattern');
    }
    return true;
  }
}

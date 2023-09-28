/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ValueObjectException } from '../../../../../shared';

import { ValueObjectBase } from '../../../../../shared';

export class UserEmailValueObject extends ValueObjectBase<string> {
  REGEX = '^[^@]+@[^@]+\\.[a-zA-Z]{2,}$';

  validateData(): void {
    this.emailPattern();
  }

  emailPattern(): void {
    if (this.value && !this.isValidEmail(this.value)) {
      throw new ValueObjectException(`User Email is not a valid email `);
    }
  }

  private isValidEmail(email: string): boolean {
    const regex = new RegExp(this.REGEX);
    return regex.test(email);
  }
}

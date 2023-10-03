/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ValueObjectException } from '../../../../../shared';

import { ValueObjectBase } from '../../../../../shared';



export class UserNameValueObject extends ValueObjectBase<string> {
  MIN_LENGTH = 3;
  MAX_LENGTH = 100;

  validateData(): void {
    const [name, lastName] = this.value.split(' ');
    this.minLength(name, lastName);
    this.maxLength(name, lastName);
    

  }

  private minLength(name, lastName): void {
    if (name.length < this.MIN_LENGTH) {
      throw new ValueObjectException(
        `User Name does not have minimum characters ${this.MIN_LENGTH} `,
      );
    }
    if (lastName.length < this.MIN_LENGTH) {
      throw new ValueObjectException(
        `User lastName does not have minimum characters ${this.MIN_LENGTH} `,
      );
    }
  }

  private maxLength(name, lastName): void {
    if (name.length > this.MAX_LENGTH) {
      throw new ValueObjectException(
        `User Name does not have minimum characters ${this.MIN_LENGTH} `,
      );
    }
    if (lastName.length > this.MAX_LENGTH) {
      throw new ValueObjectException(
        `User lastName does not have minimum characters ${this.MIN_LENGTH} `,
      );
    }
  }
  
}

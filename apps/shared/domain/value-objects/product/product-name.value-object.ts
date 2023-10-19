/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ValueObjectBase } from "../../../";
import { ValueObjectException } from "../../../";



export class nameValueObject extends ValueObjectBase<string> {
  MIN_EXTENSION = 3;
  MAX_EXTENSION = 40;

  validateData(): void {
    this.minExtension();
    this.maxExtension();
  }

  minExtension(): void {
    if (this.value.length < this.MIN_EXTENSION) {
      throw new ValueObjectException(
        `Product Name must be at least ${this.MIN_EXTENSION} characters`,
      );
    }
  }

  maxExtension(): void {
    if (this.value.length > this.MAX_EXTENSION) {
      throw new ValueObjectException(
        `Product Name must be at least ${this.MAX_EXTENSION} characters`,
      );
    }
  }
}
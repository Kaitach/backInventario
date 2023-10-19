/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ValueObjectBase } from "../../../";
import { ValueObjectException } from "../../../";


export class quantityValueObject extends ValueObjectBase<number> {
  MIN_VALUE = 0;

  validateData(): void {
    this.minValue();
  }

  minValue(): void {
    if (this.value < this.MIN_VALUE) {
      {
        throw new ValueObjectException(
          `Product Inventory Stock must be greater than ${this.MIN_VALUE}`,
        );
      }
    }
  }
}

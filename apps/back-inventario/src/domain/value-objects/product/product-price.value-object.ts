/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ValueObjectException } from "apps/shared";
import { ValueObjectBase } from "apps/shared/bases";
import { IErrorValueObject } from "apps/shared/interface";

export class ProductPriceValueObject extends ValueObjectBase<number> {

  MIN_VALUE = 0;

  validateData(): void {
    this.minValue();
  }

  minValue(): void {
    if (this.value < this.MIN_VALUE) {

      throw new ValueObjectException(`Product Price must be greater than ${this.MIN_VALUE}`,)
    }


  }


}
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ValueObjectBase } from "apps/shared/bases";
import { IErrorValueObject } from "apps/shared/interface";

export class ProductPriceValueObject extends ValueObjectBase<number> {
  MIN_VALUE = 0;
  errorMessage: string = "";
  errorsTrue: boolean = false;
  validateData(): void {
    this.minValue();
  }

  minValue(): void {
    if (this.value < this.MIN_VALUE) {
    this.errorsTrue = true;

    this.errorMessage =  `Product Price must be greater than ${this.MIN_VALUE}`;
  }


}
errorValidate(): boolean {
return this.errorsTrue;
}

}
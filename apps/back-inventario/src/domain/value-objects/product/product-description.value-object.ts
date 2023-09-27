/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */


import { ValueObjectException } from "apps/shared";
import { ValueObjectBase } from "apps/shared/bases";
import { IErrorValueObject } from "apps/shared/interface";

export class ProductDescriptionValueObject extends ValueObjectBase<string> {
  MIN_LENGTH = 3;
  MAX_LENGTH = 100;


  validateData(): void {
    this.minLength();
    this.maxLength();
  }

  private minLength(): void {
    if (this.value.length < this.MIN_LENGTH) {

      throw new ValueObjectException( `Product Description must be at least ${this.MIN_LENGTH} characters`)
    }
  }

  private maxLength(): void {
    if (this.value.length > this.MAX_LENGTH) {

      throw new ValueObjectException( `Product Description must be maximum ${this.MAX_LENGTH} characters`)

    }
  }




}

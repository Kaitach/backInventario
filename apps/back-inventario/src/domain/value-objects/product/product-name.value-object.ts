/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ValueObjectBase } from "apps/shared/bases";
import { IErrorValueObject } from "apps/shared/interface";


export class ProductNameValueObject extends ValueObjectBase<string> {
  MIN_EXTENSION = 3;
  MAX_EXTENSION = 40;
  errorMessage: string = "";
  errorsTrue: boolean = false;
  validateData(): void {
    this.minExtension();
    this.maxExtension();
  }

  minExtension(): void {
    if (this.value.length < this.MIN_EXTENSION) {
   
        this.errorsTrue = true;
        this.errorMessage =  `Product Name must be at least ${this.MIN_EXTENSION} characters`;
      }
    }
   
  

  maxExtension(): void {
    if (this.value.length > this.MAX_EXTENSION) {
    
      this.errorsTrue = true;
      this.errorMessage =  `Product Name must be maximum ${this.MAX_EXTENSION} characters`;
    }
    
  }
  errorValidate(): boolean {
    return this.errorsTrue;
  }
}
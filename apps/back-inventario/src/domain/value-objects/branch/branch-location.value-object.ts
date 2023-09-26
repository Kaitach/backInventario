/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ValueObjectBase } from "apps/shared/bases";
import { IErrorValueObject } from "apps/shared/interface";
import { isName } from "apps/shared/validations";

type Location = {
  country: string;
  city: string;
};

export class BranchLocationValueObject extends ValueObjectBase<Location> {
  MIN_EXTENSION = 3;
  MAX_COUNTRY_EXTENSION = 35;
  MAX_CITY_EXTENSION = 85;
  errorMessage: string;
  errorsTrue = false;

  validateData(): void {
    this.minContryExtension();
    this.minCityExtension();
    this.maxCountryExtension();
    this.maxCityExtension();
  }

  private minContryExtension(): void {
    if (this.value.country.length < this.MIN_EXTENSION) {
      this.errorsTrue = true;
      this.errorMessage = `Location Country must be at least ${this.MIN_EXTENSION} characters`;
    }
  }

  private minCityExtension(): void {
    if (this.value.city.length < this.MIN_EXTENSION) {
      this.errorsTrue = true;
      this.errorMessage = `Location City must be at least ${this.MIN_EXTENSION} characters`;
    }
  }

  private maxCountryExtension(): void {
    if (this.value.country.length > this.MAX_COUNTRY_EXTENSION) {
      this.errorsTrue = true;
      this.errorMessage = `Location Country must be maximum ${this.MAX_COUNTRY_EXTENSION} characters`;
    }
  }

  private maxCityExtension(): void {
    if (this.value.city.length > this.MAX_CITY_EXTENSION) {
      this.errorsTrue = true;
      this.errorMessage = `Location City must be maximum ${this.MAX_CITY_EXTENSION} characters`;
    }
  }

  errorValidate(): boolean {
    return this.errorsTrue;
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ValueObjectBase, ValueObjectException } from "../../../../../shared";


type Location = {
  country: string;
  city: string;
};

export class BranchLocationValueObject extends ValueObjectBase<Location> {
  MIN_EXTENSION = 3;
  MAX_COUNTRY_EXTENSION = 35;
  MAX_CITY_EXTENSION = 85;


  validateData(): void {
    this.minContryExtension();
    this.minCityExtension();
    this.maxCountryExtension();
    this.maxCityExtension();
  }

  private minContryExtension(): void {
    if (this.value.country.length < this.MIN_EXTENSION) {
    
      throw new ValueObjectException(`Location Country must be at least ${this.MIN_EXTENSION} characters`,)

    }
  }

  private minCityExtension(): void {
    if (this.value.city.length < this.MIN_EXTENSION) {
  
      throw new ValueObjectException(`Location City must be at least ${this.MIN_EXTENSION} characters`,)

    }
  }

  private maxCountryExtension(): void {
    if (this.value.country.length > this.MAX_COUNTRY_EXTENSION) {
    
      throw new ValueObjectException(`Location Country must be maximum ${this.MAX_COUNTRY_EXTENSION} characters`,)

    }
  }

  private maxCityExtension(): void {
    if (this.value.city.length > this.MAX_CITY_EXTENSION) {
   
      throw new ValueObjectException(`Location City must be maximum ${this.MAX_CITY_EXTENSION} characters`,)

    }
  }


}

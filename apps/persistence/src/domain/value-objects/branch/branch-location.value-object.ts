/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ValueObjectBase, ValueObjectException } from "../../../../../shared";


type Location = {
  country: string;
  city: string;
};

export class locationValueObject extends ValueObjectBase<string> {
  MIN_EXTENSION = 3;
  MAX_COUNTRY_EXTENSION = 35;
  MAX_CITY_EXTENSION = 85;


  validateData(): void {
    const [city, country] = this.value.split(',');

    this.minContryExtension(country);
    this.minCityExtension(city);
    this.maxCountryExtension(country);
    this.maxCityExtension(city);
  }

  private minContryExtension(data): void {
    if (data.length < this.MIN_EXTENSION) {
    
      throw new ValueObjectException(`Location Country must be at least ${this.MIN_EXTENSION} characters`,)

    }
  }

  private minCityExtension(data): void {
    if (data.length < this.MIN_EXTENSION) {
  
      throw new ValueObjectException(`Location City must be at least ${this.MIN_EXTENSION} characters`,)

    }
  }

  private maxCountryExtension(data): void {
    if (data.length > this.MAX_COUNTRY_EXTENSION) {
    
      throw new ValueObjectException(`Location Country must be maximum ${this.MAX_COUNTRY_EXTENSION} characters`,)

    }
  }

  private maxCityExtension(data): void {
    if (data.length > this.MAX_CITY_EXTENSION) {
   
      throw new ValueObjectException(`Location City must be maximum ${this.MAX_CITY_EXTENSION} characters`,)

    }
  }


}

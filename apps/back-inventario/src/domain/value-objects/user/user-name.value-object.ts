/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { BadRequestException } from "@nestjs/common";
import { ValueObjectException } from "apps/shared";
import { ValueObjectBase } from "apps/shared/bases";
import { IErrorValueObject } from "apps/shared/interface";

type UserName = {
  userName: string;
  userLastName: string;
};

export class UserNameValueObject extends ValueObjectBase<string> {
  MIN_LENGTH = 3;
  MAX_LENGTH = 100;

  validateData(): void {
    this.minLength();
    this.maxLength();
  }
 
  private minLength(): void {
    if (this.value.length < this.MIN_LENGTH) {

      throw new ValueObjectException(`User Name does not have minimum characters ${this.MIN_LENGTH} `,)

    }
  }

  private maxLength(): void {
    if (this.value.length > this.MAX_LENGTH) {
      throw new ValueObjectException(`User Name does not have minimum characters ${this.MIN_LENGTH} `,)

    }
  }

}
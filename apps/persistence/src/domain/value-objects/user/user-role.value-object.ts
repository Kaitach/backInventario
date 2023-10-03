/* eslint-disable prettier/prettier */

import { ValueObjectException } from '../../../../../shared';

import { ValueObjectBase } from '../../../../../shared';

enum CATEGORY_ENUM {
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin',
  Seller = 'Seller',
}

export class RoleUserValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.isIntoEnum();
  }
  isIntoEnum(): void {
    if (!Object.values(CATEGORY_ENUM).includes(this.value as CATEGORY_ENUM)) {
      throw new ValueObjectException(`User role is not correct`);
    }
  }
}

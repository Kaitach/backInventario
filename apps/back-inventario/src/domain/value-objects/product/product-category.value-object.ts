/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ValueObjectException } from '../../../../../shared';
import { ValueObjectBase } from '../../../../../shared/bases';

enum CATEGORY_ENUM {
  Hand_Tools = 'hand tools',
  Power_Tools = 'power tools',
  Locksmithing = 'locksmithing',
  Construction_Hardware = 'construction hardware',
  Paint_and_Accessories = 'paint and accessories',
  Gardening_and_Outdoors = 'gardening and outdoors',
  Safety_and_Protective_Equipment = 'safety and protection equipment',
  Plumbing_Supplies = 'plumbing supplies',
  Electrical = 'electrical',
  Home_Fixtures = 'home fixtures',
}

export class categoryValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.isIntoEnum();
  }

  isIntoEnum(): void {
    if (!Object.values(CATEGORY_ENUM).includes(this.value as CATEGORY_ENUM)) {
      throw new ValueObjectException(`Category is not correct`);
    }
  }
}

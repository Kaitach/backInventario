/* eslint-disable prettier/prettier */

import { ValueObjectBase } from "apps/shared/bases";

enum CATEGORY_ENUM {
    Admin = 'Admin',
    SuperAdmin = 'SuperAdmin',
    Seller = 'Seller'
}

export class RoleUserValueObject extends ValueObjectBase<string> {
    errorMessage: string;
    errorsTrue = false;

    validateData(): void {
        this.isIntoEnum();
    }
    isIntoEnum(): void {
        if (!Object.values(CATEGORY_ENUM).includes(this.value as CATEGORY_ENUM)) {
            this.errorsTrue = true;
            this.errorMessage = `User role is not correct`;
        }
    }

    errorValidate(): boolean {
        return this.errorsTrue;
    }
}
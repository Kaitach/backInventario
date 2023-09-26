/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { BranchDomainService, IBranchEntiy } from "apps/back-inventario/src/domain";
import { BranchLocationValueObject } from "apps/back-inventario/src/domain/value-objects/branch/branch-location.value-object";
import { BranchNameValueObject } from "apps/back-inventario/src/domain/value-objects/branch/branch-name.value-object";
import { Observable, catchError, switchMap, throwError } from "rxjs";

@Injectable()
export class registerBranchUseCase {
  constructor(private readonly branchService: BranchDomainService<IBranchEntiy>) {}

  private validateUserData(data: IBranchEntiy): Observable<string[]> {
    const branchNameValueObject = new BranchNameValueObject(data.branchName);

    if (data.branchLocation === null || data.branchLocation === undefined) {
      return throwError("branchLocation es obligatorio");
    }

    const branchLocation = data.branchLocation as unknown as { city: string; country: string };

    if (typeof branchLocation !== "object") {
      return throwError("Datos de branchLocation inválidos");
    }

    if (!("country" in branchLocation) || !("city" in branchLocation)) {
      return throwError("Datos de branchLocation inválidos");
    }

    const branchLocationValueObject = new BranchLocationValueObject(branchLocation);

    branchNameValueObject.validateData();
    branchLocationValueObject.validateData();

    if (branchNameValueObject.errorValidate()) {
      return throwError(branchNameValueObject.errorMessage);
    }

    if (branchLocationValueObject.errorValidate()) {
      return throwError(branchLocationValueObject.errorMessage);
    }

    return new Observable<string[]>(observer => {
      observer.next([]);
      observer.complete();
    });
  }

  registerBranch(data: IBranchEntiy): Observable<IBranchEntiy> {
    return this.validateUserData(data).pipe(
      switchMap(() => {
        return this.branchService.RegisterBranch(data);
      }),
      catchError(error => {
        return throwError(`Error de validación: ${error}`);
      })
    );
  }

  execute(data: IBranchEntiy): Observable<IBranchEntiy> {
    return this.registerBranch(data);
  }
}

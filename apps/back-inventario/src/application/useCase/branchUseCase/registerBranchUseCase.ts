/* eslint-disable prettier/prettier */
import { BranchDomainService, IBranchEntiy } from "apps/back-inventario/src/domain";

import { BranchLocationValueObject } from "apps/back-inventario/src/domain/value-objects/branch/branch-location.value-object";
import { BranchNameValueObject } from "apps/back-inventario/src/domain/value-objects/branch/branch-name.value-object";
import { Observable, catchError, of, switchMap, throwError } from "rxjs";
import { CreateBranchCommand } from "apps/back-inventario/src/domain/events/commands/newBranchCommand";
import { CommandBus } from "apps/back-inventario/src/domain/services/eventService";

export class registerBranchUseCase {
  constructor(private readonly branchService: BranchDomainService<IBranchEntiy>, private readonly comandBus: CommandBus) {}

  private validateBranchData(data: IBranchEntiy): Observable<IBranchEntiy> {
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

    const validatedUser: IBranchEntiy = {
      ...data, 
      branchName: branchNameValueObject.valueOf(),
      branchLocation: branchLocationValueObject.valueOf()
    };
    
 
    return of(validatedUser); 
  }

  registerBranch(data: IBranchEntiy): Observable<IBranchEntiy> {
    
    return this.validateBranchData(data).pipe(
      switchMap(() => {
           const createBranchCommand = new CreateBranchCommand(data);
     this.comandBus.execute(createBranchCommand)
        return this.branchService.RegisterBranch(data);
      }),
      catchError(error => {
        return throwError(`Error de validación: ${error}`);
      })
    );
  }


  execute(data: IBranchEntiy): Observable<IBranchEntiy> {
    return this.validateBranchData(data).pipe(
      switchMap((validatedProduct) => this.registerBranch(validatedProduct)),
      catchError(error => throwError(`Validation error: ${error}`))
    );  }
}

/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { UserDomainService, IUserEntity, BranchDomainService, IBranchEntiy } from "apps/back-inventario/src/domain";
import { UserEmailValueObject } from "apps/back-inventario/src/domain/value-objects/user/user-email.value-object";
import { UserNameValueObject } from "apps/back-inventario/src/domain/value-objects/user/user-name.value-object";
import { UserPasswordValueObject } from "apps/back-inventario/src/domain/value-objects/user/user-password.value-objects";
import { RoleUserValueObject } from "apps/back-inventario/src/domain/value-objects/user/user-role.value-object";
import { Observable, catchError, map, of, switchMap, throwError } from "rxjs";

@Injectable()
export class registeruserUseCase {
  constructor(private readonly userService: UserDomainService<IUserEntity>,
              private readonly breachDomanService: BranchDomainService<IBranchEntiy>) { }

  private validateUserData(data: IUserEntity): Observable<string[]> {

    const userEmailValueObject = new UserEmailValueObject(data.userEmail);
    const userNameValueObject = new UserNameValueObject(data.username);
    const userRoleValueObject = new RoleUserValueObject(data.userRole);
    const userPasswordValueObject = new UserPasswordValueObject(data.userPassword);
    userEmailValueObject.validateData();
    userNameValueObject.validateData();
    userRoleValueObject.validateData();
    userPasswordValueObject.validateData();


   
    if (userPasswordValueObject.errorValidate()) {
      return throwError(userPasswordValueObject.errorMessage);
    }

    if (userEmailValueObject.errorValidate()) {
      return throwError(userEmailValueObject.errorMessage);
    }

    if (userRoleValueObject.errorValidate()) {
      return throwError(userRoleValueObject.errorMessage);
    }
    if (userNameValueObject.errorValidate()) {
      return throwError(userNameValueObject.errorMessage);
    }

    return new Observable<string[]>(observer => {
      observer.next([]);
      observer.complete();
    });
  }




  private validateBranchExistence(branchId: string): Observable<boolean> {
    return this.breachDomanService.findBranchById(branchId).pipe(
      map(branch => !!branch), // Verifica si la sucursal existe
      catchError(() => of(false)) // Maneja errores si la sucursal no existe o si ocurre algún otro error
    );
  }

  registeruser(data: IUserEntity): Observable<IUserEntity> {
    return this.validateBranchExistence(data.branchID).pipe(
      switchMap(branchExists => {
        if (!branchExists) {
          return throwError("La sucursal no existe.");
        }
        return this.validateUserData(data).pipe(
          switchMap(() => {
            return this.userService.registerUser(data);
          }),
          catchError(error => {
            return throwError(`Validation error: ${error}`);
          })
        );
      })
    );
  }

  execute(data: IUserEntity): Observable<IUserEntity> {
    return this.registeruser(data);
  }
}
/* eslint-disable prettier/prettier */
import { UserDomainService, IUserEntity, BranchDomainService, IBranchEntiy } from "apps/back-inventario/src/domain";
import { CreateUserCommand } from "apps/back-inventario/src/domain/events/commands/newUserCommand";
import { CommandBus } from "apps/back-inventario/src/domain/services/eventService";
import { UserEmailValueObject } from "apps/back-inventario/src/domain/value-objects/user/user-email.value-object";
import { UserNameValueObject } from "apps/back-inventario/src/domain/value-objects/user/user-name.value-object";
import { UserPasswordValueObject } from "apps/back-inventario/src/domain/value-objects/user/user-password.value-objects";
import { RoleUserValueObject } from "apps/back-inventario/src/domain/value-objects/user/user-role.value-object";
import { Observable, catchError, map, of, switchMap, throwError } from "rxjs";

export class registeruserUseCase {
  constructor(private readonly userService: UserDomainService<IUserEntity>,
              private readonly breachDomanService: BranchDomainService<IBranchEntiy>, private readonly comandBus: CommandBus) { }

  private validateUserData(data: IUserEntity): Observable<IUserEntity> {

    const userEmailValueObject = new UserEmailValueObject(data.userEmail);
    const userNameValueObject = new UserNameValueObject(data.username);
    const userRoleValueObject = new RoleUserValueObject(data.userRole);
    const userPasswordValueObject = new UserPasswordValueObject(data.userPassword);
    userEmailValueObject.validateData();
    userNameValueObject.validateData();
    userRoleValueObject.validateData();
    userPasswordValueObject.validateData();

    const validatedUser: IUserEntity = {
      ...data, 
      userEmail: userEmailValueObject.valueOf(),
      username: userNameValueObject.valueOf(),
      userRole: userRoleValueObject.valueOf(),
      userPassword: userPasswordValueObject.valueOf(),
    };
      
    const createBranchCommand = new CreateUserCommand(validatedUser);
     this.comandBus.execute(createBranchCommand)
    return of(validatedUser); 
  }


  private validateBranchExistence(branchId: string): Observable<boolean> {
    return this.breachDomanService.findBranchById(branchId).pipe(
      map(branch => !!branch),
      catchError(() => of(false)) 
    );
  }

  registeruser(data: IUserEntity): Observable<IUserEntity> {
    return this.validateBranchExistence(data.branchID).pipe(
      switchMap(branchExists => {
        if (!branchExists) {
          return throwError("La sucursal no existe.");
        }
        return this.validateUserData(data).pipe(
          switchMap(validatedUser => {
            return this.userService.registerUser(validatedUser);
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
/* eslint-disable prettier/prettier */
import { IRegisterUser, UserDomainService } from 'apps/persistence/src';
import { IBranchEntiy } from 'apps/persistence/src/domain/entities/branchAggregate';
import { IUserEntity } from 'apps/persistence/src/domain/entities/userEntityDomain';
import { BranchDomainService } from 'apps/persistence/src/domain/services/branchServiceDomain';
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';

export class registeruserUseCase {
  constructor(
    private readonly userService: UserDomainService<IUserEntity>,
    private readonly breachDomanService: BranchDomainService<IBranchEntiy >,
  ) {}

  private validateUserData(data: IUserEntity): Observable<IUserEntity> {
    const userDataOV = new IUserEntity(data);

    return of(userDataOV);
  }


  private validateBranchExistence(branchId: string): Observable<boolean> {
    return this.breachDomanService.findBranchById(branchId).pipe(
      map((branch) => !!branch),
      catchError(() => of(false)),
    );
  }

  private registerUser(data: IRegisterUser): Observable<IUserEntity> {

    const newUser = {
      branchId: data.branchId,
      email: data.email,
      name: `${data.name.firstName} ${data.name.lastName}`,
      password: data.password,
      role: data.role,
    } as IUserEntity;   

    return this.validateBranchExistence(newUser.branchId).pipe(
      switchMap((branchExists) => {
        if (!branchExists) {
          return throwError('La sucursal no existe.');
        }

        return this.validateUserData(newUser).pipe(
          switchMap(() => {

            return this.userService.registerUser(newUser);          
          }),
          catchError((error) => {
            return throwError(`Validation error: ${error}`);
          }),
        );
      }),
    );
  }

  execute(data: IRegisterUser): Observable<IUserEntity> {

    return this.registerUser(data);
  }
}


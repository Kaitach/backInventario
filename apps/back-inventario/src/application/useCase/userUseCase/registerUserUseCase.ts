/* eslint-disable prettier/prettier */
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';
import {
  BranchDomainService,
  CommandBus,
  IBranchEntiy,
  IUserEntity,
  UserDomainService,
} from '../../../../../';
import { CreateUserCommand } from '../../../domain/events/commands/';
import { IRegisterUser } from 'apps/back-inventario/src/domain/interfaces/registerUserInterface';
export class registeruserUseCase {
  constructor(
    private readonly userService: UserDomainService<IUserEntity>,
    private readonly breachDomanService: BranchDomainService<IBranchEntiy >,
    private readonly comandBus: CommandBus,
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

  private createUserCommand(userData: IUserEntity): void {
    const createUserCommand = new CreateUserCommand(userData);
    this.comandBus.execute(createUserCommand);
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
            this.createUserCommand(newUser)
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


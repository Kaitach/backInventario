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
export class registeruserUseCase {
  constructor(
    private readonly userService: UserDomainService<IUserEntity>,
    private readonly breachDomanService: BranchDomainService<IBranchEntiy>,
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

  registeruser(data: IUserEntity): Observable<IUserEntity> {
    return this.validateBranchExistence(data.branchID.valueOf()).pipe(
      switchMap((branchExists) => {
        if (!branchExists) {
          return throwError('La sucursal no existe.');
        }
        return this.validateUserData(data).pipe(
          switchMap((userData) => {
            const createUserCommand = new CreateUserCommand(userData);
            this.comandBus.execute(createUserCommand);
            return this.userService.registerUser(userData);
          }),
          catchError((error) => {
            return throwError(`Validation error: ${error}`);
          }),
        );
      }),
    );
  }

  execute(data: IUserEntity): Observable<IUserEntity> {
    return this.registeruser(data);
  }
}

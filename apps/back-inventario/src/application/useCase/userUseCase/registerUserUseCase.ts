import { UUID } from 'crypto';
/* eslint-disable prettier/prettier */
import { IRegisterUser } from 'apps/back-inventario/src/domain/interfaces/registerUserInterface';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import {
  BranchDomainService,
  CommandBus,
  IBranchEntiy,
  IUserEntity,
  UserDomainService,
} from '../../../../../';
import { v4 as uuidv4 } from 'uuid';
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




  private createUserCommand(userData: IUserEntity): void {
    const exchange = 'user'
    const routingKey = 'new.User'
    console.log('usuario nuevo' + userData)
    this.comandBus.registerUser(exchange,routingKey, userData, userData.branchId)
  }


  private registerUser(data: IRegisterUser): Observable<IUserEntity> {
    const newUser = {
      branchId: data.branchId,
      email: data.email,
      name: `${data.name.firstName} ${data.name.lastName}`,
      password: data.password,
      role: data.role,
      id: uuidv4()
    } as IUserEntity;
  

        return this.validateUserData(newUser).pipe(
          switchMap(() => {
            this.createUserCommand(newUser)
            return this.userService.registerUser(newUser);          
          }),
          catchError((error) => {
            return throwError(`Validation error: ${error}`);
          }),
        );
      }
  

  execute(data: IRegisterUser): Observable<IUserEntity> {
    return this.registerUser(data);
  }

}

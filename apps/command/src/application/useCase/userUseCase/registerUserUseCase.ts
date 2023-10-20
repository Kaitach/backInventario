/* eslint-disable prettier/prettier */
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';
import { CommandBus, IRegisterUser, IUserEntity, UserDomainService } from '../../../../../shared';


export class registeruserUseCase {
  constructor(
    private readonly userService: UserDomainService<IUserEntity>,
    private readonly comandBus: CommandBus,
  ) {}

  private validateUserData(data: IUserEntity): Observable<IUserEntity> {
    const userDataOV = new IUserEntity(data);

    return of(userDataOV);
  }




  private createUserCommand(userData: IUserEntity): void {
    const exchange = 'user'
    const routingKey = 'new.User'
    console.log('usuario nuevo' + JSON.stringify( userData))
    console.log( userData)

    this.comandBus.registerUser(exchange,routingKey, userData, userData.branchId)
  }


  public registerUser(data: IRegisterUser): any {
    const newUser = {
      branchId: data.branchId,
      email: data.email,
      name: `${data.name.firstName} ${data.name.lastName}`,
      password: data.password,
      role: data.role,
      id: uuidv4()
    } as IUserEntity;
    this.createUserCommand(newUser)
    this.userService.registerUser(newUser);          
  }
        
      
  

  execute(data: IRegisterUser): Observable<IUserEntity> {
    return this.registerUser(data);
  }

}

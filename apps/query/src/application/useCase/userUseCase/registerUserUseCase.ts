/* eslint-disable prettier/prettier */

import { Observable } from 'rxjs';
import { UserDomainService, IUserEntity, BranchDomainService, IBranchEntiy } from '../../../../../shared';

export class registeruserUseCase {
  constructor(
    private readonly userService: UserDomainService<IUserEntity>,
    private readonly breachDomanService: BranchDomainService<IBranchEntiy >,
  ) {}






  private registerUser(data: IUserEntity): Observable<IUserEntity> {
 
        return this.userService.registerUser(data);
      
    
  }
  
  execute(data: IUserEntity): Observable<IUserEntity> {
  

    return this.registerUser(data);
  }
}


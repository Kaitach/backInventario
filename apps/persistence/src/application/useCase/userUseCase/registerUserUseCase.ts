/* eslint-disable prettier/prettier */
import {  UserDomainService } from 'apps/persistence/src';
import { IBranchEntiy } from 'apps/persistence/src/domain/entities/branchAggregate';
import { IUserEntity } from 'apps/persistence/src/domain/entities/userEntityDomain';
import { BranchDomainService } from 'apps/persistence/src/domain/services/branchServiceDomain';
import { Observable } from 'rxjs';

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


/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserDomainService } from 'apps/persistence/src/domain';
import { Observable } from 'rxjs';
import { UserTypeOrmEntity } from '../entities/userDBentity';
import { userRepository } from '../repositories';
@Injectable()
export class userDBService implements UserDomainService<UserTypeOrmEntity> {
  constructor(
    private readonly UserRepository: userRepository,
  ) { }
  registerUser(data: UserTypeOrmEntity): Observable<UserTypeOrmEntity> {
    return this.UserRepository.registerUser(data)
  }


}

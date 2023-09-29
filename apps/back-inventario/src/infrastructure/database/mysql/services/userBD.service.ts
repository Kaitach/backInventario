/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserTypeOrmEntity } from '../entities/userDBentity';
import { UserDomainService } from 'apps/back-inventario/src/domain/services/userServiceDomain';
import { Observable } from 'rxjs';
import { userRepository } from '../repositories';
import { RegisterUserDto } from '../../../utils/dto/user/registerUser';
@Injectable()
export class userDBService implements UserDomainService<UserTypeOrmEntity> {
  constructor(
    private readonly UserRepository: userRepository,
  ) { }
  registerUser(data: UserTypeOrmEntity): Observable<UserTypeOrmEntity> {
    return this.UserRepository.registerUser(data)
  }


}

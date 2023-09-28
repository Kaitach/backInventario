/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDomainService } from "../../../../../../back-inventario/src/domain/services/userServiceDomain";
import { Observable, from, catchError, throwError } from "rxjs";
import { UserTypeOrmEntity } from "../entities";
import { RegisterUserDto } from "../../../utils/dto/user/registerUser";

@Injectable()
export class userRepository implements UserDomainService<UserTypeOrmEntity> {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userRepository: Repository<UserTypeOrmEntity>,
  ) { }
  registerUser(data: RegisterUserDto): Observable<UserTypeOrmEntity> {
    return from(this.userRepository.save(data)).pipe(
      catchError((error) => throwError(`Error al crear usuario: ${error.message}`)),
    );  }







}

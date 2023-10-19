/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Observable, from, catchError, throwError } from "rxjs";
import { UserTypeOrmEntity } from "../entities";
import { UserDomainService } from "../../../../../../shared";

@Injectable()
export class userRepository implements UserDomainService<UserTypeOrmEntity> {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userRepository: Repository<UserTypeOrmEntity>,
  ) { }

  registerUser(data: UserTypeOrmEntity): Observable<UserTypeOrmEntity> {
  
    return from(this.userRepository.save(data)).pipe(
      catchError((error) => throwError(`Error al crear usuario: ${error.message}`)),
    );  }







}

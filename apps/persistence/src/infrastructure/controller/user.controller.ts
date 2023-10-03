/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { userDelegate } from '../../application/delegate/userDelegate';
import { UserTypeOrmEntity, branchServiceBD, userDBService } from '../database';
import { RegisterUserDto } from '../utils/dto/user/registerUser';
import { Observable } from 'rxjs';
import { EventPattern } from '@nestjs/microservices';

@Controller('api/v1/user')
export class UserController {
    private readonly useCase: userDelegate;

    constructor(
      private readonly userService: userDBService,
      private readonly branchService: branchServiceBD,
    ) {
      this.useCase = new userDelegate(this.userService, this.branchService ); 
    }
  
    @EventPattern('create user')
    @Post('register')
   registerUser(@Body() user: RegisterUserDto): Observable<UserTypeOrmEntity> {
    console.log(user);
      this.useCase.registerUser();
      return this.useCase.execute(user);
    }
    
 }

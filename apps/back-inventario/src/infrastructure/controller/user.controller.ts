/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { userDelegate } from '../../application/delegate/userDelegate';
import { UserTypeOrmEntity, userDBService } from '../database';
import { RegisterUserDto } from '../utils/dto/user/registerUser';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {
    private readonly useCase: userDelegate;

    constructor(
      private readonly userService: userDBService,
  
    ) {
      this.useCase = new userDelegate(this.userService); 
    }
  
    @Post()
   registerUser(@Body() user: RegisterUserDto): Observable<UserTypeOrmEntity> {
      this.useCase.registerUser();
      return this.useCase.execute(user);
    }
    
 }

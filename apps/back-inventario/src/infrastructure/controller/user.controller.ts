/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { userDelegate } from '../../application/delegate/userDelegate';
import { UserTypeOrmEntity, branchServiceBD, userDBService } from '../database';
import { RegisterUserDto } from '../utils/dto/user/registerUser';
import { Observable } from 'rxjs';
import { CommandBus } from '@nestjs/cqrs';

@Controller('user')
export class UserController {
    private readonly useCase: userDelegate;

    constructor(
      private readonly userService: userDBService,
      private readonly branchService: branchServiceBD,
       private readonly comandBus: CommandBus
    ) {
      this.useCase = new userDelegate(this.userService,  this.comandBus,this.branchService ); 
    }
  
    @Post()
   registerUser(@Body() user: RegisterUserDto): Observable<UserTypeOrmEntity> {
      this.useCase.registerUser();
      return this.useCase.execute(user);
    }
    
 }

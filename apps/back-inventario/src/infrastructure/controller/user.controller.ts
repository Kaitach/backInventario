/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { userDelegate } from '../../application/delegate/userDelegate';
import { RegisterUserDto } from '../utils/dto/user/registerUser';
import { Observable } from 'rxjs';
import { CommandBus } from '@nestjs/cqrs';
import { userServiceIntrastructure } from '../service/infrastructureUser.service';
import { infrastuctureBranchService } from '../service/infrastructureBranch.service';

@Controller('api/v1/user')
export class UserController {
    private readonly useCase: userDelegate;

    constructor(
      private readonly userService: userServiceIntrastructure,
      private readonly branchService: infrastuctureBranchService,
       private readonly comandBus: CommandBus
    ) {
      this.useCase = new userDelegate(this.userService,  this.comandBus,this.branchService ); 
    }
  
    @Post('register')
   registerUser(@Body() user: RegisterUserDto): Observable<void> {
      this.useCase.registerUser();
      return this.useCase.execute(user);
    }
    
 }

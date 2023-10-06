/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { userDelegate } from '../../application/delegate/userDelegate';
import { RegisterUserDto } from '../utils/dto/user/registerUser';
import { Observable } from 'rxjs';
import { userServiceIntrastructure } from '../service/infrastructureUser.service';
import { infrastuctureBranchService } from '../service/infrastructureBranch.service';
import { MessagingService } from '../events/service/serviceEvent';
import { ErrorExceptionFilter } from '../utils/exception-filters/error.exception-filter';

@Controller('api/v1/user')
@UseFilters(ErrorExceptionFilter)

export class UserController {
    private readonly useCase: userDelegate;

    constructor(
      private readonly userService: userServiceIntrastructure,
      private readonly branchService: infrastuctureBranchService,
       private readonly comandBus: MessagingService
    ) {
      this.useCase = new userDelegate(this.userService,  this.comandBus,this.branchService ); 
    }
  
    @Post('register')
   registerUser(@Body() user: RegisterUserDto): Observable<void> {
      this.useCase.registerUser();
      return this.useCase.execute(user);
    }
    
 }

/* eslint-disable prettier/prettier */

import { Body, Controller,  Post, UseFilters, UseGuards  } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BranchDelegate } from '../../application/delegate/branchDelegate';
import { infrastuctureBranchService } from '../service/infrastructureBranch.service';
import { RegisterBranchDto } from '../utils/dto/branch/registerBranch';
import { MessagingService } from '../events/service/serviceEvent';
import { ErrorExceptionFilter } from '../utils/exception-filters/error.exception-filter';
import { AuthGuard } from '../utils/guards/auth.guard';
import { SuperAdminGuard } from '../utils/guards/superAdmin.guard';

@Controller('api/v1/branch')
@UseFilters(ErrorExceptionFilter)

export class BranchController {
    private readonly useCase: BranchDelegate;

    constructor(
      private readonly branchService: infrastuctureBranchService,
      private readonly eventBus: MessagingService
  
    ) {
      this.useCase = new BranchDelegate(this.branchService, this.eventBus); 
    }
  
    @Post('register')
    @UseGuards(AuthGuard,SuperAdminGuard )
   registerBranch(@Body() branch: RegisterBranchDto): Observable<void> {
      this.useCase.registerBranch();
      return this.useCase.execute(branch);
    }

    
}

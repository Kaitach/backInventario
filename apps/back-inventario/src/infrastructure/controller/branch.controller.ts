/* eslint-disable prettier/prettier */
import { CommandBus } from '@nestjs/cqrs';

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BranchDelegate } from '../../application/delegate/branchDelegate';
import { infrastuctureBranchService } from '../service/infrastructureBranch.service';
import { RegisterBranchDto } from '../utils/dto/branch/registerBranch';
import { MessagingService } from '../events/service/serviceEvent';

@Controller('api/v1/branch')
export class BranchController {
    private readonly useCase: BranchDelegate;

    constructor(
      private readonly branchService: infrastuctureBranchService,
      private readonly eventBus: MessagingService
  
    ) {
      this.useCase = new BranchDelegate(this.branchService, this.eventBus); 
    }
  
    @Post('register')
   registerBranch(@Body() branch: RegisterBranchDto): Observable<void> {
      this.useCase.registerBranch();
      return this.useCase.execute(branch);
    }

    @Get(':idBranch')
    findById(@Param('idBranch') id: string): Observable<void> {
      return this.branchService.findBranchById(id);
    }

    @Get()
    getAll(): Observable<void[]> {
      return this.branchService.getall();
    }
    
}

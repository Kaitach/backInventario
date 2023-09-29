/* eslint-disable prettier/prettier */
import { CommandBus } from '@nestjs/cqrs';

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BranchDelegate } from '../../application/delegate/branchDelegate';
import { BranchTypeOrmEntity, branchServiceBD } from '../database';
import { RegisterBranchDto } from '../utils/dto/branch/registerBranch';
import { Observable } from 'rxjs';

@Controller('api/v1/branch')
export class BranchController {
    private readonly useCase: BranchDelegate;

    constructor(
      private readonly branchService: branchServiceBD,
      private readonly eventBus: CommandBus
  
    ) {
      this.useCase = new BranchDelegate(this.branchService, this.eventBus); 
    }
  
    @Post('register')
   registerBranch(@Body() branch: RegisterBranchDto): Observable<BranchTypeOrmEntity> {
      this.useCase.registerBranch();
      return this.useCase.execute(branch);
    }

    @Get(':idBranch')
    findById(@Param('idBranch') id: string): Observable<BranchTypeOrmEntity> {
      return this.branchService.findBranchById(id);
    }

    @Get()
    getAll(): Observable<BranchTypeOrmEntity[]> {
      return this.branchService.getall();
    }
    
}

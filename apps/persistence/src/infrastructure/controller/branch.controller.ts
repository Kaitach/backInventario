/* eslint-disable prettier/prettier */

import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { BranchDelegate } from '../../application/delegate/branchDelegate';
import { BranchTypeOrmEntity, branchServiceBD } from '../database';
import { RegisterBranchDto } from '../utils/dto/branch/registerBranch';

@Controller('api/v1/branch')
export class BranchController {
    private readonly useCase: BranchDelegate;

    constructor(
      private readonly branchService: branchServiceBD,
  
    ) {
      this.useCase = new BranchDelegate(this.branchService); 
    }
  
   
    @Post('register')
   registerBranch(@Payload() eventData:RegisterBranchDto): Observable<BranchTypeOrmEntity> {
      this.useCase.registerBranch();
      return this.useCase.execute(eventData);
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

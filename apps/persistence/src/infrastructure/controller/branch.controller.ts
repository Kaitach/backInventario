/* eslint-disable prettier/prettier */

import { Controller, Get,  Post } from '@nestjs/common';
import {  Payload } from '@nestjs/microservices';
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

 

    @Get()
    getAll(): Observable<BranchTypeOrmEntity[]> {
      this.useCase.getAllBranch();

      return this.useCase.execute();
    }
    
}

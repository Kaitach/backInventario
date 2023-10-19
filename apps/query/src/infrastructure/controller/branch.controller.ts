/* eslint-disable prettier/prettier */

import { Controller, Get,   } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BranchDelegate } from '../../application/delegate/branchDelegate';
import { BranchTypeOrmEntity, branchServiceBD } from '../database';

@Controller('api/v1/branch')
export class BranchController {
    private readonly useCase: BranchDelegate;

    constructor(
      private readonly branchService: branchServiceBD,
  
    ) {
      this.useCase = new BranchDelegate(this.branchService); 
    }
  
   
 
 

    @Get()
    getAll(): Observable<BranchTypeOrmEntity[]> {
      this.useCase.getAllBranch();

      return this.useCase.execute();
    }
    
}

/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { BranchDelegate } from '../../application/delegate/branchDelegate';
import { BranchTypeOrmEntity, branchServiceBD } from '../database';
import { RegisterBranchDto } from '../utils/dto/branch/registerBranch';
import { Observable } from 'rxjs';

@Controller('branch')
export class BranchController {
    private readonly useCase: BranchDelegate;

    constructor(
      private readonly branchService: branchServiceBD,
  
    ) {
      this.useCase = new BranchDelegate(this.branchService); 
    }
  
    @Post()
   registerBranch(@Body() branch: RegisterBranchDto): Observable<BranchTypeOrmEntity> {
      this.useCase.registerBranch();
      return this.useCase.execute(branch);
    }
    
}

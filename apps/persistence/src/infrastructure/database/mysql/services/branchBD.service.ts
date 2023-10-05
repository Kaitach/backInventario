/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

import { BranchTypeOrmEntity } from "../entities";
import { branchRepository } from "../repositories";
import { BranchDomainService } from "apps/persistence/src";

@Injectable()
export class branchServiceBD implements  BranchDomainService<BranchTypeOrmEntity> {
  constructor(private readonly BranchRepository: branchRepository,) { }
  getAllBranch(): Observable<BranchTypeOrmEntity[]> {
    return this.BranchRepository.getAllBranch();
  }
  findBranchById(id: string): Observable<BranchTypeOrmEntity> {
    return this.BranchRepository.findBranchById(id);
  }
  RegisterBranch(data: BranchTypeOrmEntity): Observable<BranchTypeOrmEntity> {
    return this.BranchRepository.RegisterBranch(data);
  }
 
}
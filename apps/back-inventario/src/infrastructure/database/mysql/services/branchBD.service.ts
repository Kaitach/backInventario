/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

import { BranchDomainService } from "../../../../../../back-inventario/src/domain/services/branchServiceDomain";
import { BranchTypeOrmEntity } from "../entities";
import { branchRepository } from "../repositories";
import { RegisterBranchDto } from "../../../utils/dto/branch/registerBranch";

@Injectable()
export class branchServiceBD implements  BranchDomainService<BranchTypeOrmEntity> {
  constructor(private readonly BranchRepository: branchRepository) { }
  findBranchById(id: string): Observable<BranchTypeOrmEntity> {
    return this.BranchRepository.findBranchById(id);
  }
  RegisterBranch(data: RegisterBranchDto): Observable<BranchTypeOrmEntity> {
    return this.BranchRepository.RegisterBranch(data);
  }




}

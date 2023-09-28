/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Observable, from, catchError, throwError } from "rxjs";
import { Repository } from "typeorm";
import { BranchTypeOrmEntity } from "../entities";
import { BranchDomainService } from "../../../../../../back-inventario/src/domain/services/branchServiceDomain";
import { RegisterBranchDto } from "../../../utils/dto/branch/registerBranch";


@Injectable()
export class branchRepository implements BranchDomainService<BranchTypeOrmEntity> {
  constructor(
    @InjectRepository(BranchTypeOrmEntity)
    private readonly branchRepository: Repository<BranchTypeOrmEntity>,
  ) { }
  findBranchById(id: string): Observable<BranchTypeOrmEntity> {
    return from(
      this.branchRepository
        .createQueryBuilder("branch")
        .leftJoinAndSelect("branch.branchProducts", "products")
        .leftJoinAndSelect("branch.branchEmployees", "employees")
        .where("branch.branchId = :id", { id }) 
        .getOne()
    ).pipe(
      catchError((error) => throwError(`Error al obtener la branch por ID: ${error.message}`))
    );
  }
  
  RegisterBranch(entity: RegisterBranchDto): Observable<BranchTypeOrmEntity> {
    return from(this.branchRepository.save(entity)).pipe(
      catchError((error) => throwError(`Error al crear branch: ${error.message}`)),
    );
  }

    

}

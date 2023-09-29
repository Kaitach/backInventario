/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, catchError, from, throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { BranchDomainService } from '../../../../../../back-inventario/src/domain/services/branchServiceDomain';
import { BranchTypeOrmEntity } from '../entities';

@Injectable()
export class branchRepository
  implements BranchDomainService<BranchTypeOrmEntity >
{
  constructor(
    @InjectRepository(BranchTypeOrmEntity)
    private readonly branchRepository: Repository<BranchTypeOrmEntity>,
  ) {}
  findBranchById(id: string): Observable<BranchTypeOrmEntity> {
    return from(
      this.branchRepository
        .createQueryBuilder('branch')
        .leftJoinAndSelect('branch.products', 'products')
        .leftJoinAndSelect('branch.users', 'employees')
        .where('branch.branchId = :id', { id })
        .getOne(),
    ).pipe(
      catchError((error) =>
        throwError(`Error al obtener la branch por ID: ${error.message}`),
      ),
    );
  }
  getAll(): Observable<BranchTypeOrmEntity[]> {
    return from(
      this.branchRepository
        .createQueryBuilder('branch')
        .select(['branch.branchId', 'branch.name', 'branch.location'])
        .getMany()
    ).pipe(
      catchError((error) =>
        throwError(`Error al obtener todas las sucursales: ${error.message}`)
      )
    );
  }
  RegisterBranch(entity: BranchTypeOrmEntity): Observable<BranchTypeOrmEntity> {
  
    return from(this.branchRepository.save(entity)).pipe(
      catchError((error) =>
        throwError(`Error al crear branch: ${error.message}`),
      ),
    );
  }
}

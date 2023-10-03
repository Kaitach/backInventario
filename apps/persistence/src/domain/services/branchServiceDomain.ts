/* eslint-disable prettier/prettier */
  import { IBranchEntiy } from "apps/back-inventario";
import { Observable } from "rxjs";

export interface BranchDomainService<T> {
    RegisterBranch(data: IBranchEntiy): Observable<T>;
    findBranchById(id: string): Observable<T>
  }
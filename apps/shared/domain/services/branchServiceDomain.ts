/* eslint-disable prettier/prettier */
  import { Observable } from "rxjs";

export interface BranchDomainService<T> {
    RegisterBranch(data: T): Observable<void>;
    findBranchById?(id: string): Observable<void>
    getAllBranch?(): Observable<T[]>

  }
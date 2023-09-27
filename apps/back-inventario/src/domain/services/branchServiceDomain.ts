/* eslint-disable prettier/prettier */
  import { Observable } from "rxjs";

export interface BranchDomainService<T> {
    RegisterBranch(data: T): Observable<T>;
    findBranchById(id: string): Observable<T>
  }
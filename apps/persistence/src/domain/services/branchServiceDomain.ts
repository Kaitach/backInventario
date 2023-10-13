/* eslint-disable prettier/prettier */
import { Observable } from "rxjs";
import { IBranchEntiy } from "../entities";

export interface BranchDomainService<T> {
    RegisterBranch(data: IBranchEntiy): Observable<T>;
    findBranchById(id: string): Observable<T>
    getAllBranch(): Observable<T[]>

  }
import { Observable, of } from "rxjs";
import { Injectable } from "@nestjs/common";
import { BranchDomainService, IBranchEntiy } from "../../domain";

@Injectable()
export class infrastuctureBranchService implements    BranchDomainService<IBranchEntiy>  {

    RegisterBranch(): Observable<void>{
       
        return of(null);        

    }
    findBranchById(): Observable<void>{
       
        return of(null);          

    }
    getall(): Observable<void[]>{
        return of(null);          

    }



}
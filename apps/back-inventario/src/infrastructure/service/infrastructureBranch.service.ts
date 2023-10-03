import { Observable, of } from "rxjs";
import { Injectable } from "@nestjs/common";
import { BranchDomainService, IBranchEntiy } from "../../domain";

@Injectable()
export class infrastuctureBranchService implements    BranchDomainService<IBranchEntiy>  {

    RegisterBranch(data: IBranchEntiy): Observable<void>{
        console.log('Registrado correctamente:', data);
        return of(null);        

    }
    findBranchById(id: string): Observable<void>{
        console.log('Registrado correctamente:', id);
        return of(null);          

    }
    getall(): Observable<void[]>{
        console.log('Registrado correctamente:');
        return of(null);          

    }



}
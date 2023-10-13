import { Observable } from "rxjs";

export interface AuthDomainService<T> {


    generateToken(data: T): Observable<string>;
  


    }
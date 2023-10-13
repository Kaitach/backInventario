import { Observable } from "rxjs";

export interface UserDomainService<T> {


    registerUser(data: T): void;
    findByEmail(email: string): Observable<T>;


    }
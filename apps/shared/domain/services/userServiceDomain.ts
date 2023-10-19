/* eslint-disable prettier/prettier */

import { Observable } from "rxjs/internal/Observable";

export interface UserDomainService<T> {


    registerUser(data: T): Observable<T>;

    }
/* eslint-disable prettier/prettier */

import { Observable } from "rxjs/internal/Observable";
import { IRegisterUser } from "../interfaces/registerUserInterface";

export interface UserDomainService<T> {


    registerUser(data: T): Observable<T>;

    }
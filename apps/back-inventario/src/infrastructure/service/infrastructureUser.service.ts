import { Injectable } from "@nestjs/common";
import { IUserEntity, UserDomainService } from "../../domain";
import { Observable, of } from "rxjs";

@Injectable()
export class userServiceIntrastructure implements   UserDomainService<IUserEntity>  {

    registerUser(): Observable<IUserEntity>{
        return of(null);  
    }



}
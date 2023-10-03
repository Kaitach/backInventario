import { Injectable } from "@nestjs/common";
import { IUserEntity, UserDomainService } from "../../domain";
import { Observable, of } from "rxjs";

@Injectable()
export class userServiceIntrastructure implements   UserDomainService<IUserEntity>  {

    registerUser(data: IUserEntity): Observable<IUserEntity>{
        console.log('Registrado correctamente:', data);
        return of(null);  
    }



}
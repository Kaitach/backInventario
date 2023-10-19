import { Injectable } from "@nestjs/common";
import { IUserEntity, UserDomainService } from "../../../../shared";
import { EventRepository } from "../database";
import { CreateEventDto } from "../utils";

@Injectable()
export class userServiceIntrastructure implements   UserDomainService<IUserEntity>  {
    constructor(
        private readonly repository: EventRepository,
      
      ){}
      

    registerUser(data: IUserEntity ): any{
       
        const eventDataAsString = JSON.stringify(data);

        const createEventDto = new CreateEventDto(
        eventDataAsString,
        'new.User',
        data.branchId,
       )
        this.repository.saveEvent(createEventDto, data.branchId);   
    }



}
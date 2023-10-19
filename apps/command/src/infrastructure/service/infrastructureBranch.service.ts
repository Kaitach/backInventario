import { Injectable } from "@nestjs/common";
import { BranchDomainService, IBranchEntiy } from "../../../../shared";
import { EventRepository } from "../database";
import { CreateEventDto } from "../utils";

@Injectable()
export class infrastuctureBranchService implements    BranchDomainService<IBranchEntiy>  {

    constructor(
        private readonly repository: EventRepository,
      
      ){}
      

   

    RegisterBranch(data: IBranchEntiy ): any{
       
        const eventDataAsString = JSON.stringify(data);

        const createEventDto = new CreateEventDto(
        eventDataAsString,
        'BranchRegister',
        data.branchId,
       )
        this.repository.saveEvent(createEventDto, data.branchId); 
    }

   



}
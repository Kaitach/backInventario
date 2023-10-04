/* eslint-disable prettier/prettier */
import { BranchDomainService, IBranchEntiy, IBranchRegister } from 'apps/persistence/src';
import { Observable,  } from 'rxjs';

export class registerBranchUseCase {
  constructor(
    private readonly branchService: BranchDomainService<IBranchEntiy>,
  ) {}




  registerBranch(data: IBranchRegister): Observable<IBranchEntiy> {

    const newBranch  = {
      name:  data.name,
      location: data.location.city + "," + data.location.country
          } as IBranchEntiy
          console.log(newBranch)


        return this.branchService.RegisterBranch(newBranch);
   
    
  }

  execute(data: any): Observable<IBranchEntiy> {
    return this.registerBranch( data);
  }
}

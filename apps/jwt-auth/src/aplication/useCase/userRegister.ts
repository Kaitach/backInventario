import { IUserEntity } from "../../domain/entity/userEntity";
import { UserDomainService } from "../../domain/service/userDomainService";

export class registeruserUseCase {
  constructor(
    private readonly userService: UserDomainService<IUserEntity>,

  ) {}

  execute(data:IUserEntity ): void {
     this.userService.registerUser(data);
  

}

}
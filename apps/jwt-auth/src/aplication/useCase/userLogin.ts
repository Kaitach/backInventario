import { Observable, switchMap, of } from "rxjs";
import { IUserEntity } from "../../domain/entity/userEntity";
import { UserDomainService, AuthDomainService } from "../../domain";



  export class LoginUserUseCase {
    constructor(
      private readonly userService: UserDomainService<IUserEntity>,
      private readonly authService: AuthDomainService<IUserEntity>,
    ) {}
  
    execute(email: string, password: string): Observable<string | null> {
      return this.userService.findByEmail(email).pipe(
        switchMap((user) => {
          if (user) {
            if (password === user.password) {
              return this.authService.generateToken(user);
            }
          }
  
          return of(null); 
        })
      );
    }
  }

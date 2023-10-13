import { Observable } from 'rxjs';
import { IUserEntity } from '../entity/userEntity';

export interface IUserMongooseInterface {
  countDocuments(): Observable<number>;
  registerUser(user: IUserEntity) : void
}

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {  userDocument } from '../schemas';
import { IUserEntity } from 'apps/jwt-auth/src/domain/entity/userEntity';
import { UserDomainService } from '../../../../domain/service/userDomainService';
import { Observable, from } from 'rxjs';
import { DuplicateKeyException } from '../../../utils/filter/mongo-duplicate';


export class userRepository implements UserDomainService<IUserEntity> {
  constructor(
    @InjectModel('user') private readonly userModel: Model<userDocument>,
  ) {}
  registerUser(data: IUserEntity): void {
    try {
      this.userModel.create(data);
    } catch (error) {
      if (error.code === 11000) {
        throw new DuplicateKeyException('email');
      }
      throw error;
    }
  }

countDocuments(): Observable<number> {
  return from(this.userModel.countDocuments().exec());
}

findByEmail(email: string): Observable<IUserEntity> {
  return from(this.userModel.findOne({ email }).exec());
}
 
  }
  

 
  


  
  
  


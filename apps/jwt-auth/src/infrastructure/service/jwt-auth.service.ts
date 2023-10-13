import * as jwt from 'jsonwebtoken';
import { from, Observable } from 'rxjs';
import { IUserEntity } from '../../domain/entity/userEntity';
import { AuthDomainService } from '../../domain/service/authDomainService';

export class AuthService implements AuthDomainService<IUserEntity>{
  private readonly secretKey = 'secret';

  generateToken(data: IUserEntity): Observable<string> {
    const payload = {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      branchId: data.branchId,
    };
    const expiresIn = '30m';

    const token = jwt.sign(payload, this.secretKey, { expiresIn });
    return from(Promise.resolve(token));
  }
}

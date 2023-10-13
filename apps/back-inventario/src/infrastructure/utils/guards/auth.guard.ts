import { RegisterUserDto } from './../dto/user/registerUser';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable, map } from 'rxjs';
import { EventRepository } from '../../database';
import { DecodedToken } from './decoded';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(EventRepository) private eventRepository: EventRepository,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer ')
    ) {
      try {
        const token = request.headers.authorization.split(' ')[1];
        if (!jwt.verify(token, 'secret')) throw new UnauthorizedException();

        const decoded = jwt.decode(token) as DecodedToken  ;
        const data = new RegisterUserDto()

        data.email = decoded.email
        return this.eventRepository.existUser(data).pipe(
          map((  ) => {
              return true;
            
          }),        );
      } catch (error) {
        throw new UnauthorizedException();
      }
    }

    return false;
  }
}
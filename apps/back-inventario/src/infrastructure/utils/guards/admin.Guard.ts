import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
  import { Observable } from 'rxjs';
  import { DecodedToken } from './decoded';
  
  @Injectable()
  export class AdminGuard implements CanActivate {
    constructor(
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
  
          const decoded = jwt.decode(token) as DecodedToken;
  
          if (decoded.role === 'SuperAdmin' || decoded.role === 'Admin') {
            return true;
          }
        } catch (error) {
          throw new UnauthorizedException();
        }
      }
  
      return false;
    }
  }

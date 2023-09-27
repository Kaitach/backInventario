/* eslint-disable prettier/prettier */
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // Personaliza el comportamiento del guardia aquí
    // Esto es lo que sucede cuando el token JWT es válido
    if (request.user) {
      // Puedes acceder a los datos del usuario aquí
      const user = request.user;
      console.log('Datos del usuario:', user);
    } else {
      // Esto se ejecutará si el token JWT es válido pero no contiene datos de usuario
      throw new UnauthorizedException('Token JWT válido pero sin datos de usuario');
    }
    
    return true; // Siempre permite el acceso sin restricciones
  }
}


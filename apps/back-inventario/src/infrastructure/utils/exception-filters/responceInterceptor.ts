import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class SuccessResponseInterceptor<T>
    implements NestInterceptor<T, { message: string;   }>
  {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<{ message: string;   }> {
      return next.handle().pipe(
        map(() => ({
          message: 'El recurso se creó con éxito',
           
        })),
      );
    }
  }
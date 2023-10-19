import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
   
  } from '@nestjs/common';
  import { Response } from 'express';
import { DuplicateKeyException } from './mongo-duplicate';
  
  @Catch(DuplicateKeyException)
  export class DuplicateKeyFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
    
        if (status === 500) {
          response.status(409).json({
            statusCode: 409,
            message: 'El registro con la clave duplicada ya existe.',
          });
        } else {
          response.status(status).json({
            statusCode: status,
            message: exception.message,
          });
        }
      }
  }
  
import { Catch, ExceptionFilter, HttpException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();

    if (status === 200) {
      const responseBody = { message: 'La operación se realizó con éxito' };
      response.status(status).json(responseBody);
    } else if (status === 201) {
      const responseBody = { message: 'El recurso se creó con éxito' };
      response.status(status).json(responseBody);
    } else {
      response.status(status).json(exception.getResponse());
    }
  }
}

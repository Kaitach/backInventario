import { Catch, ExceptionFilter, HttpException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();

    if (status === 200) {
      // Personaliza la respuesta para el código de estado 200 (OK)
      const responseBody = { message: 'La operación se realizó con éxito' };
      response.status(status).json(responseBody);
    } else if (status === 201) {
      // Personaliza la respuesta para el código de estado 201 (Created)
      const responseBody = { message: 'El recurso se creó con éxito' };
      response.status(status).json(responseBody);
    } else {
      // Si no es una respuesta 200 o 201, simplemente reenvía la excepción
      response.status(status).json(exception.getResponse());
    }
  }
}

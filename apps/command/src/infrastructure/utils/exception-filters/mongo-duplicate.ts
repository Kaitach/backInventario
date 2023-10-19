import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateKeyException extends HttpException {
  constructor(propertyName: string) {
    super(`El valor proporcionado para ${propertyName} ya existe.`, HttpStatus.CONFLICT);
  }
}

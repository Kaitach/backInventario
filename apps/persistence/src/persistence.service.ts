import { Injectable } from '@nestjs/common';

@Injectable()
export class PersistenceService {
  getHello(): string {
    return 'Hello World!';
  }
}

import { Controller, Get } from '@nestjs/common';
import { PersistenceService } from './persistence.service';

@Controller()
export class PersistenceController {
  constructor(private readonly persistenceService: PersistenceService) {}

  @Get()
  getHello(): string {
    return this.persistenceService.getHello();
  }
}

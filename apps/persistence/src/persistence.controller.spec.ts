import { Test, TestingModule } from '@nestjs/testing';
import { PersistenceController } from './persistence.controller';
import { PersistenceService } from './persistence.service';

describe('PersistenceController', () => {
  let persistenceController: PersistenceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PersistenceController],
      providers: [PersistenceService],
    }).compile();

    persistenceController = app.get<PersistenceController>(PersistenceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(persistenceController.getHello()).toBe('Hello World!');
    });
  });
});

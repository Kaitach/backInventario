import { Test, TestingModule } from '@nestjs/testing';
import { SoketIoService } from './gatweys/inventoryGatwey.service';
import { SoketIoController } from './soket-io.controller';

describe('SoketIoController', () => {
  let soketIoController: SoketIoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SoketIoController],
      providers: [SoketIoService],
    }).compile();

    soketIoController = app.get<SoketIoController>(SoketIoController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(soketIoController.getHello()).toBe('Hello World!');
    });
  });
});

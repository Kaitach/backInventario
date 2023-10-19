import { Test, TestingModule } from '@nestjs/testing';
import { Server } from 'socket.io';
import { branchGatwey } from '../userGatwey';

describe('BranchGateway', () => {
  let branchGateway: branchGatwey;
  let server: Server;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [branchGatwey],
    }).compile();

    branchGateway = module.get<branchGatwey>(branchGatwey);
    server = new Server(); 
    branchGateway.server = server; 
  });

  it('debe estar definido', () => {
    expect(branchGateway).toBeDefined();
  });

  describe('registerProduct', () => {
    it('debería emitir el evento "new.User_<branchId>" con la carga proporcionada', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const emitSpy = jest.spyOn(server, 'emit');

      branchGateway.registerProduct(payload);

      expect(emitSpy).toHaveBeenCalledWith(`new.User_123`, payload);
    });

    it('debería loguear un mensaje de éxito al emitir el evento', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const consoleLogSpy = jest.spyOn(console, 'log');

      branchGateway.registerProduct(payload);

      expect(consoleLogSpy).toHaveBeenCalledWith('Evento emitido correctamente');
    });

    it('debería loguear un mensaje de error cuando ocurre un error', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const error = new Error('Error de prueba');
      jest.spyOn(server, 'emit').mockImplementation(() => {
        throw error;
      });
      const consoleErrorSpy = jest.spyOn(console, 'error');

      branchGateway.registerProduct(payload);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error al emitir el evento:', error);
    });
  });
});

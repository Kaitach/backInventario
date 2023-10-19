import { Test, TestingModule } from '@nestjs/testing';
import { userGatwey } from '..';
import { Server } from 'socket.io';
import { mock, instance, when, anything } from 'ts-mockito';



describe('UserGateway', () => {
    let UserGateway: userGatwey;
    let server: Server;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [userGatwey],
      }).compile();
  
      UserGateway = module.get<userGatwey>(userGatwey);
      server = new Server();
      UserGateway.server = server;    });
  
    it('should be defined', () => {
      expect(UserGateway).toBeDefined();
    });
  
    describe('registerProduct', () => {
        it('debería emitir el evento "branchRegister" con la carga proporcionada', () => {
            const payload = { clave: 'valor' };
            const emitSpy = jest.spyOn(server, 'emit');
      
            UserGateway.registerProduct(payload);
      
            expect(emitSpy).toHaveBeenCalledWith('branchRegister', payload);
          });
  
      it('should log a success message when emitting the event', () => {
        const payload = { key: 'value' };
        const consoleLogSpy = jest.spyOn(console, 'log');
  
        UserGateway.registerProduct(payload);
  
        expect(consoleLogSpy).toHaveBeenCalledWith('Evento emitido correctamente');
      });
  
    
    });
  

    it('should log an error message when an error occurs', () => {
      const payload = { key: 'value' };
      const error = new Error('Test error');
      jest.spyOn(server, 'emit').mockImplementation(() => {
        throw error;
      });
      const consoleErrorSpy = jest.spyOn(console, 'error');

      UserGateway.registerProduct(payload);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error al emitir el evento:', error);
    });

  describe('registerSale', () => {
    it('should emit the "saleEvent_<branchId>" event with the provided payload', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const emitSpy = jest.spyOn(server, 'emit');

      UserGateway.registerSale(payload);

      expect(emitSpy).toHaveBeenCalledWith('saleEvent_123', payload);
    });

    it('should log a success message when emitting the event', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const consoleLogSpy = jest.spyOn(console, 'log');

      UserGateway.registerSale(payload);

      expect(consoleLogSpy).toHaveBeenCalledWith('Evento emitido correctamente');
    });

    it('should log an error message when an error occurs', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const error = new Error('Test error');
      jest.spyOn(server, 'emit').mockImplementation(() => {
        throw error;
      });
      const consoleErrorSpy = jest.spyOn(console, 'error');

      UserGateway.registerSale(payload);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error al emitir el evento:', error);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { Server } from 'socket.io';
import { inventoryGatwey } from '../inventoryGatwey.service';

describe('InventoryGateway', () => {
  let inventoryGateway: inventoryGatwey;
  let server: Server;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [inventoryGatwey],
    }).compile();

    inventoryGateway = module.get<inventoryGatwey>(inventoryGatwey);
    server = new Server(); 
    inventoryGateway.server = server; 
  });

  it('debe estar definido', () => {
    expect(inventoryGateway).toBeDefined();
  });

  describe('afterInit', () => {
    it('debería loguear un mensaje al iniciar', () => {
      const consoleLogSpy = jest.spyOn(console, 'log');

      inventoryGateway.afterInit();

      expect(consoleLogSpy).toHaveBeenCalledWith('Esto se ejecuta cuando inicia');
    });
  });

  describe('handleConnection', () => {
    it('debería loguear un mensaje cuando se conecta un usuario', () => {
      const consoleLogSpy = jest.spyOn(console, 'log');

      inventoryGateway.handleConnection();

      expect(consoleLogSpy).toHaveBeenCalledWith('Hola alguien se conecto al socket 👌👌👌');
    });
  });

  describe('handleDisconnect', () => {
    it('debería loguear un mensaje cuando un usuario se desconecta', () => {
      const consoleLogSpy = jest.spyOn(console, 'log');

      inventoryGateway.handleDisconnect();

      expect(consoleLogSpy).toHaveBeenCalledWith('usuario desconectado');
    });
  });

  describe('registerProduct', () => {
    it('debería emitir el evento "productRegister_<branchId>" con la carga proporcionada', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const emitSpy = jest.spyOn(server, 'emit');

      inventoryGateway.registerProduct(payload);

      expect(emitSpy).toHaveBeenCalledWith(`productRegister_123`, payload);
    });

    it('debería loguear un mensaje de éxito al emitir el evento', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const consoleLogSpy = jest.spyOn(console, 'log');

      inventoryGateway.registerProduct(payload);

      expect(consoleLogSpy).toHaveBeenCalledWith('Evento emitido correctamente');
    });

    it('debería loguear un mensaje de error cuando ocurre un error', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const error = new Error('Error de prueba');
      jest.spyOn(server, 'emit').mockImplementation(() => {
        throw error;
      });
      const consoleErrorSpy = jest.spyOn(console, 'error');

      inventoryGateway.registerProduct(payload);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error al emitir el evento:', error);
    });
  });

  describe('productreturn', () => {
    it('debería emitir eventos "productRegister_<branchId>" y "saleEvent_<branchId>" con la carga proporcionada', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const emitSpy = jest.spyOn(server, 'emit');

      inventoryGateway.productreturn(payload);

      expect(emitSpy).toHaveBeenCalledWith(`productRegister_123`, payload);
      expect(emitSpy).toHaveBeenCalledWith(`saleEvent_123`, payload);
    });

    it('debería loguear un mensaje de éxito al emitir los eventos', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const consoleLogSpy = jest.spyOn(console, 'log');

      inventoryGateway.productreturn(payload);

      expect(consoleLogSpy).toHaveBeenCalledWith('Evento emitido correctamente');
    });

    it('debería loguear un mensaje de error cuando ocurre un error', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const error = new Error('Error de prueba');
      jest.spyOn(server, 'emit').mockImplementation(() => {
        throw error;
      });
      const consoleErrorSpy = jest.spyOn(console, 'error');

      inventoryGateway.productreturn(payload);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error al emitir el evento:', error);
    });
  });

  describe('reSellerSale', () => {
    it('debería emitir eventos "productRegister_<branchId>" y "saleEvent_<branchId>" con la carga proporcionada', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const emitSpy = jest.spyOn(server, 'emit');

      inventoryGateway.reSellerSale(payload);

      expect(emitSpy).toHaveBeenCalledWith(`productRegister_123`, payload);
      expect(emitSpy).toHaveBeenCalledWith(`saleEvent_123`, payload);
    });

    it('debería loguear un mensaje de éxito al emitir los eventos', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const consoleLogSpy = jest.spyOn(console, 'log');

      inventoryGateway.reSellerSale(payload);

      expect(consoleLogSpy).toHaveBeenCalledWith('Evento emitido correctamente');
    });

    it('debería loguear un mensaje de error cuando ocurre un error', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const error = new Error('Error de prueba');
      jest.spyOn(server, 'emit').mockImplementation(() => {
        throw error;
      });
      const consoleErrorSpy = jest.spyOn(console, 'error');

      inventoryGateway.reSellerSale(payload);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error al emitir el evento:', error);
    });
  });

  describe('addInventory', () => {
    it('debería emitir el evento "productRegister_<branchId>" con la carga proporcionada', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const emitSpy = jest.spyOn(server, 'emit');

      inventoryGateway.addInventory(payload);

      expect(emitSpy).toHaveBeenCalledWith(`productRegister_123`, payload);
    });

    it('debería loguear un mensaje de éxito al emitir el evento', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const consoleLogSpy = jest.spyOn(console, 'log');

      inventoryGateway.addInventory(payload);

      expect(consoleLogSpy).toHaveBeenCalledWith('Evento emitido we');
    });

    it('debería loguear un mensaje de error cuando ocurre un error', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const error = new Error('Error de prueba');
      jest.spyOn(server, 'emit').mockImplementation(() => {
        throw error;
      });
      const consoleErrorSpy = jest.spyOn(console, 'error');

      inventoryGateway.addInventory(payload);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error al emitir el evento:', error);
    });
  });

  describe('customerSale', () => {
    it('debería emitir eventos "productRegister_<branchId>" y "saleEvent_<branchId>" con la carga proporcionada', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const emitSpy = jest.spyOn(server, 'emit');

      inventoryGateway.customerSale(payload);

      expect(emitSpy).toHaveBeenCalledWith(`productRegister_123`, payload);
      expect(emitSpy).toHaveBeenCalledWith(`saleEvent_123`, payload);
    });

    it('debería loguear un mensaje de éxito al emitir los eventos', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const consoleLogSpy = jest.spyOn(console, 'log');

      inventoryGateway.customerSale(payload);

      expect(consoleLogSpy).toHaveBeenCalledWith('Evento emitido correctamente');
    });

    it('debería loguear un mensaje de error cuando ocurre un error', () => {
      const payload = JSON.stringify({ branchId: '123' });
      const error = new Error('Error de prueba');
      jest.spyOn(server, 'emit').mockImplementation(() => {
        throw error;
      });
      const consoleErrorSpy = jest.spyOn(console, 'error');

      inventoryGateway.customerSale(payload);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error al emitir el evento:', error);
    });
  });
});

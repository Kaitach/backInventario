import { of } from "rxjs";
import {CommandBus,  ProductDomainService, IProductEntity } from "../../../../../shared";
import {productDelegate} from '../productDelegate'
describe('productDelegate', () => {
    let ProductDelegate: productDelegate;
    let productServiceMock: ProductDomainService<IProductEntity>;
    let commandBusMock: CommandBus;
  
    beforeEach(() => {
      productServiceMock = {} as ProductDomainService<IProductEntity>;
      commandBusMock = {} as CommandBus;
      ProductDelegate = new productDelegate(productServiceMock, commandBusMock);
    });
  
    describe('registerCustomerSale', () => {
      it('should set the delegate to registerCustomerSaleUseCase', () => {
        // Act
        ProductDelegate.registerCustomerSale();
  
        // Assert
        expect(ProductDelegate['delegate']).toBeDefined(); // Verifica que se haya configurado el delegado
      });
    });
  
    describe('registerProduct', () => {
      it('should set the delegate to RegisterProductUseCase', () => {
        // Act
        ProductDelegate.registerProduct();
  
        // Assert
        expect(ProductDelegate['delegate']).toBeDefined(); // Verifica que se haya configurado el delegado
      });
    });
  
    describe('registerquantity', () => {
      it('should set the delegate to registerquantityUseCase', () => {
        // Act
        ProductDelegate.registerquantity();
  
        // Assert
        expect(ProductDelegate['delegate']).toBeDefined(); // Verifica que se haya configurado el delegado
      });
    });
  
    describe('registerResellerSale', () => {
      it('should set the delegate to RegisterResellerSaleUseCase', () => {
        // Act
        ProductDelegate.registerResellerSale();
  
        // Assert
        expect(ProductDelegate['delegate']).toBeDefined(); // Verifica que se haya configurado el delegado
      });
    });
  
    describe('returnquantityUseCase', () => {
      it('should set the delegate to returnquantityUseCase', () => {
        // Act
        ProductDelegate.returnquantityUseCase();
  
        // Assert
        expect(ProductDelegate['delegate']).toBeDefined(); // Verifica que se haya configurado el delegado
      });
    });
  
    describe('execute', () => {
      it('should call the execute method of the delegate with the provided arguments', () => {
        // Arrange
        const expectedResponse = { foo: 'bar' };
        const delegateMock = {
          execute: jest.fn().mockReturnValue(of(expectedResponse))
        };
        ProductDelegate['delegate'] = delegateMock;
  
        // Act
        const result$ = ProductDelegate.execute('arg1', 'arg2');
  
        // Assert
        expect(delegateMock.execute).toHaveBeenCalledWith('arg1', 'arg2');
        result$.subscribe((result) => {
          expect(result).toEqual(expectedResponse);
        });
      });
    });
  });
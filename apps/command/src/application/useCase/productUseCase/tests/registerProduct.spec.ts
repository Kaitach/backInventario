import { of } from 'rxjs';
import {CommandBus, ProductDomainService, IProductEntity } from '../../../../../../shared';
import { RegisterProductUseCase } from '../registerProductUseCase';


describe('RegisterProductUseCase', () => {
  let productUseCase: RegisterProductUseCase;
  let commandBusMock: CommandBus;
  let productDomainServiceMock: ProductDomainService<IProductEntity>;

  beforeEach(() => {
    commandBusMock = {} as CommandBus;
    productDomainServiceMock = {} as ProductDomainService<IProductEntity>;
    productUseCase = new RegisterProductUseCase( productDomainServiceMock, commandBusMock);
  });

  describe('registerProduct', () => {
    it('should register a product and call the productDomainService', () => {
      // Arrange
      const data: IProductEntity = {
        productId: 'product-id-1',
        name: 'Product 1',
        price: 10,
        quantity: 5,
        branchId: 'branch-id',
        description: '',
        category: ''
      };

      // Mock the commandBus and productDomainService methods to return the data
      commandBusMock.registerProduct = jest.fn(() => of(void 0));
      productDomainServiceMock.registerProduct = jest.fn(() => of(data));

      // Act
      const result$ = productUseCase.registerProduct(data);

      // Assert
      expect(commandBusMock.registerProduct).toHaveBeenCalledWith('productInventory', 'productRegister', data, 'branch-id');
      result$.subscribe((result) => {
        expect(result).toEqual(data);
      });
    });
  });

  describe('execute', () => {
    it('should call the registerProduct method with provided data', () => {
      // Arrange
      const data: IProductEntity = {
        productId: 'product-id-1',
        name: 'Product 1',
        price: 10,
        quantity: 5,
        branchId: 'branch-id',
        description: '',
        category: ''
      };

      // Mock the registerProduct method to return the data
      productUseCase['registerProduct'] = jest.fn(() => of(data));

      // Act
      const result$ = productUseCase.execute(data);

      // Assert
      expect(productUseCase['registerProduct']).toHaveBeenCalledWith(data);
      result$.subscribe((result) => {
        expect(result).toEqual(data);
      });
    });
  });
});
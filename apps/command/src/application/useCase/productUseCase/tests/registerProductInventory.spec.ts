import { of } from 'rxjs';
import { CommandBus, ProductDomainService, IProductEntity } from '../../../../../../shared';
import { registerquantityUseCase } from '../registerProductInventotyStockUseCase';


describe('registerquantityUseCase', () => {
  let quantityUseCase: registerquantityUseCase;
  let commandBusMock: CommandBus;
  let productDomainServiceMock: ProductDomainService<IProductEntity>;

  beforeEach(() => {
    commandBusMock = {} as CommandBus;
    productDomainServiceMock = {} as ProductDomainService<IProductEntity>;
    quantityUseCase = new registerquantityUseCase(productDomainServiceMock, commandBusMock );
  });

  describe('registerquantity', () => {
    it('should register product updates and call the productDomainService', () => {
      // Arrange
      const branchId = 'branch-id';
      const product1: IProductEntity = {
        productId: 'product-id-1',
        name: 'Product 1',
        price: 10,
        quantity: 5,
        branchId: 'branch-id',
        description: '',
        category: ''
      };
      const product2: IProductEntity = {
        productId: 'product-id-2',
        name: 'Product 2',
        price: 15,
        quantity: 3,
        branchId: 'branch-id',
        description: '',
        category: ''
      };
      const products: IProductEntity[] = [product1, product2];

      // Mock the commandBus and productDomainService methods to return void
      commandBusMock.registerAddInventory = jest.fn(() => of(void 0));
      productDomainServiceMock.registerquantity = jest.fn(() => of(void 0));

      // Act
      quantityUseCase.registerquantity(branchId, products);

      // Assert
      expect(commandBusMock.registerAddInventory).toHaveBeenCalledTimes(2);
      expect(productDomainServiceMock.registerquantity).toHaveBeenCalledTimes(2);
    });
  });

  describe('execute', () => {
    it('should call the registerquantity method with provided data and id', () => {
      // Arrange
      const branchId = 'branch-id';
      const product1: IProductEntity = {
        productId: 'product-id-1',
        name: 'Product 1',
        price: 10,
        quantity: 5,
        branchId: 'branch-id',
        description: '',
        category: ''
      };
      const product2: IProductEntity = {
        productId: 'product-id-2',
        name: 'Product 2',
        price: 15,
        quantity: 3,
        branchId: 'branch-id',
        description: '',
        category: ''
      };
      const products: IProductEntity[] = [product1, product2];

      // Mock the registerquantity method to return void
      quantityUseCase['registerquantity'] = jest.fn(() => of(void 0));

      // Act
      quantityUseCase.execute(products, branchId);

      // Assert
      expect(quantityUseCase['registerquantity']).toHaveBeenCalledWith(branchId, products);
    });
  });
});

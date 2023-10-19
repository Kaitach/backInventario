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
    quantityUseCase = new registerquantityUseCase(productDomainServiceMock );
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
 
      // Mock the commandBus and productDomainService methods to return void
      commandBusMock.registerAddInventory = jest.fn(() => of(void 0));
      productDomainServiceMock.registerquantity = jest.fn(() => of(void 0));

      // Act
      quantityUseCase.registerquantity(branchId, product1);

      // Assert
      expect(commandBusMock.registerAddInventory).not.toHaveBeenCalled()
      expect(productDomainServiceMock.registerquantity).toHaveBeenCalled()
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
   
      // Mock the registerquantity method to return void
      quantityUseCase['registerquantity'] = jest.fn(() => of(void 0));

      // Act
      quantityUseCase.execute(product1, branchId);

      // Assert
      expect(quantityUseCase['registerquantity']).toHaveBeenCalledWith(branchId, product1);
    });
  });
});

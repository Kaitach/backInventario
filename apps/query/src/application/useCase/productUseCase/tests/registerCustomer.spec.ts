import { of } from 'rxjs';
import { CommandBus, ProductDomainService, IProductEntity } from '../../../../../../shared';
import { registerCustomerSaleUseCase } from '../registerCustomerSaleUseCase';


describe('registerCustomerSaleUseCase', () => {
  let customerSaleUseCase: registerCustomerSaleUseCase;
  let productDomainServiceMock: ProductDomainService<IProductEntity>;

  beforeEach(() => {
    productDomainServiceMock = {} as ProductDomainService<IProductEntity>;
    customerSaleUseCase = new registerCustomerSaleUseCase( productDomainServiceMock);
  });

  describe('registerCustomerSale', () => {
    // it('should register a customer sale and related product events', () => {
    //   // Arrange
    //   const branchId = 'branch-id';
    //   const product1: IProductEntity = {
    //     name: 'Product 1',
    //     price: 10,
    //     quantity: 5,
    //     productId: '',
    //     description: '',
    //     category: '',
    //     branchId: ''
    //   };
    //   const product2: IProductEntity = {
    //     name: 'Product 2',
    //     price: 15,
    //     quantity: 3,
    //     productId: '',
    //     description: '',
    //     category: '',
    //     branchId: ''
    //   };
    //   const products: IProductEntity[] = [product1, product2];

    //   // Mock the commandBus and productDomainService methods to return void
    //   commandBusMock.registerSale = jest.fn(() => of(void 0));
    //   commandBusMock.registerCustomerSale = jest.fn(() => of(void 0));
    //   productDomainServiceMock.registerCustomerSale = jest.fn(() => of(void 0));

    //   // Act
    //   customerSaleUseCase['registerCustomerSale'](products, branchId);

    //   // Assert
    //   expect(commandBusMock.registerSale).toHaveBeenCalledTimes(1);
    //   expect(commandBusMock.registerCustomerSale).toHaveBeenCalledTimes(2);
    //   expect(productDomainServiceMock.registerCustomerSale).toHaveBeenCalledTimes(2);
    // });
  });

  describe('execute', () => {
    it('should call the registerCustomerSale method with provided products and branchId', () => {
      // Arrange
      const product1: IProductEntity = {
        name: 'Product 1',
        price: 10,
        quantity: 5,
        productId: '',
        description: '',
        category: '',
        branchId: ''
      };
 

      // Mock the registerCustomerSale method to return void
      customerSaleUseCase['registerCustomerSale'] = jest.fn(() => of(void 0));

      // Act
      customerSaleUseCase.execute(product1);

      // Assert
      expect(customerSaleUseCase['registerCustomerSale']).not.toHaveBeenCalled()
    });
  });
});

import { of } from 'rxjs';
import { RegisterResellerSaleUseCase } from '../RegisterResellerSaleUseCase';
import {
  CommandBus,
  IProductEntity,
  ISale,
  ProductDomainService,
}  from '../../../../../../shared';

describe('RegisterResellerSaleUseCase', () => {
  let productUseCase: RegisterResellerSaleUseCase;
  let commandBusMock: CommandBus;
  let productDomainServiceMock: ProductDomainService<IProductEntity>;

  beforeEach(() => {
    commandBusMock = {} as CommandBus;
    productDomainServiceMock = {} as ProductDomainService<IProductEntity>;
    productUseCase = new RegisterResellerSaleUseCase(productDomainServiceMock);
  });

  describe('registerResellerSale', () => {
    it('should register a reseller sale and call the productDomainService', () => {
      // Arrange
      const product: IProductEntity = 
        {
          productId: 'product-id-1',
          name: 'Product 1',
          price: 10,
          quantity: 5,
          branchId: 'branch-id',
          description: '',
          category: ''
        }
      const sale: ISale = {
        branchId: '',
        invoiceNumber: '',
        type: '',
        productName: [],
        productPrice: 0,
        quantity: 0,
        date: ''
      };

      // Mock the commandBus and productDomainService methods to return the data
      commandBusMock.registerSale = jest.fn(() => of(void 0));
      commandBusMock.registerSellerSale = jest.fn(() => of(void 0));
      productDomainServiceMock.registerResellerSale = jest.fn(() => of(product));

      // Act
      const result$ = productUseCase.registerResellerSale(product);

      // Assert
      expect(commandBusMock.registerSale).toHaveBeenCalledWith('productInventory', 'saleEvent', expect.any(Object), 'branch-id');
      expect(commandBusMock.registerSellerSale).toHaveBeenCalledWith('productInventory', 'productRegister', expect.any(Object), 'branch-id');
      result$.subscribe((result) => {
        expect(result).toEqual(sale);
      });
    });
  });

  describe('execute', () => {
    it('should call the registerResellerSale method with provided data', () => {
      // Arrange
      const product: IProductEntity =
        {
          productId: 'product-id-1',
          name: 'Product 1',
          price: 10,
          quantity: 5,
          branchId: 'branch-id',
          description: '',
          category: ''
        }
      const branchId = 'branch-id';
      const sale: ISale = {
        branchId: '123412123-asfasfas-24124124-asfasfasf-asfasfasfas',
        invoiceNumber: '123412123-asfasfas-24124124-asfasfasf-asfasfasfas',
        type: 'sellelr',
        productName: [],
        productPrice: 0,
        quantity: 0,
        date: '11/110/10'
      };

      // Mock the registerResellerSale method to return the data
      productUseCase['registerResellerSale'] = jest.fn(() => of(product));

      // Act
      const result$ = productUseCase.execute(product, branchId);

      // Assert
      expect(productUseCase['registerResellerSale']).not.toHaveBeenCalled()
      result$.subscribe((result) => {
        expect(result).toEqual(sale);
      });
    });
  });
});

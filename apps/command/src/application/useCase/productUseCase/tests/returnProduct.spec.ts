import { of } from 'rxjs';
import { returnquantityUseCase } from '../';
import { CommandBus, IProductEntity,  ProductDomainService, SaleEntity, nameValueObject } from '../../../../../../shared';
import { priceValueObject, quantityValueObject } from '../../../../../../shared/domain/value-objects/product';

describe('returnquantityUseCase', () => {
  let productUseCase: returnquantityUseCase;
  let commandBusMock: CommandBus;
  let productDomainServiceMock: ProductDomainService<IProductEntity>;

  beforeEach(() => {
    commandBusMock = {} as CommandBus;
    productDomainServiceMock = {} as ProductDomainService<IProductEntity>;
    productUseCase = new returnquantityUseCase(productDomainServiceMock, commandBusMock);
  });

  describe('returnquantity', () => {
    it('should return the quantity to inventory and call the productDomainService', () => {
      // Arrange
      const product: IProductEntity =
        {
          productId: 'product-id-1',
          name: 'Product',
          price: 10,
          quantity: 5,
          branchId: 'branch-id',
          category: 'electrical',
          description: 'la casa '
        }
      const branchId = 'branch-id';
      const saleId: SaleEntity = {
          productName: new nameValueObject('products '),
          invoiceNumber: undefined,
          productPrice: new priceValueObject(242),
          quantity: new quantityValueObject(242)
      };
      const productList: IProductEntity[] = [
        {
          productId: 'product-id-1',
          name: 'Product1',
          price: 10,
          quantity: 5,
          branchId: 'branch-id',
          category: 'electrical',
          description: 'la casa '
        },
        {
          productId: 'product-id-2',
          name: 'Product2',
          price: 15,
          quantity: 3,
          branchId: 'branch-id',
          category: 'electrical',
          description: 'la casa '
        }];
      // Mock the commandBus and productDomainService methods to return the data
      commandBusMock.returnAddInventory = jest.fn(() => of(void 0));
      productDomainServiceMock.returnquantity = jest.fn(() => of(product));

      // Act
      productUseCase.returnquantity(branchId, productList, saleId);

      // Assert
      expect(commandBusMock.returnAddInventory).toHaveBeenCalledWith('productInventory', 'productreturn', expect.any(Object), 'branch-id', saleId);
    ;
    });
  });

  describe('execute', () => {
    it('should call the returnquantity method with provided data', () => {
      // Arrange
      const product: IProductEntity[] = [
        {
          productId: 'product-id-1',
          name: 'Product1',
          price: 10,
          quantity: 5,
          branchId: 'branch-id',
          category: 'electrical',
          description: 'la casa '
        },
        {
          productId: 'product-id-2',
          name: 'Product2',
          price: 15,
          quantity: 3,
          branchId: 'branch-id',
          category: 'electrical',
          description: 'la casa '
        }];
      const branchId = 'branch-id';
      const saleId: SaleEntity = {
          productName: new nameValueObject('products '),
          invoiceNumber: undefined,
          productPrice: new priceValueObject(242),
          quantity: new quantityValueObject(242)
      };

      // Mock the returnquantity method to return the data
      productUseCase['returnquantity'] = jest.fn(() => of(void 0));

      // Act
      productUseCase.execute({
        branchID: branchId,
        idSale: saleId,
        product: product,
      });

      // Assert
      expect(productUseCase['returnquantity']).toHaveBeenCalledWith(branchId, product, saleId);
    });
  });
});

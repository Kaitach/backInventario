import { of, throwError } from 'rxjs';
import {
  CommandBus,
  IProductEntity,
  ProductDomainService,
  newProductSalecommand,
  registerCustomerSaleUseCase,
} from '../../../..';

describe('registerCustomerProductSaleUseCase', () => {
  let useCase: registerCustomerSaleUseCase;
  let ProductServiceMock: ProductDomainService<IProductEntity>;
  let comandBusMock: CommandBus;

  beforeEach(() => {
    ProductServiceMock = {} as ProductDomainService<IProductEntity>;

    comandBusMock = {
      execute: jest.fn(),
    };

    useCase = new registerCustomerSaleUseCase(
      ProductServiceMock,
      comandBusMock,
    );
  });

  it('debería registrar una venta correctamente', (done) => {
    // Arrange
    const productData = {
      productId: '9828eacd-01fb-45d2-91dc-24518b30b0a8',
      quantity: 100,
    } as IProductEntity;

    const createBranchCommand = new newProductSalecommand(productData);

    ProductServiceMock.findByID = jest
      .fn()
      .mockReturnValueOnce(of(productData));

    ProductServiceMock.registerCustomerSale = jest
      .fn()
      .mockReturnValueOnce(of(productData));

    // Act
    useCase.registercustomerSale(productData).subscribe((result) => {
      // Assert
      expect(result).toEqual(productData);
      expect(ProductServiceMock.findByID).toHaveBeenCalledWith(
        productData.productId,
      );
      expect(comandBusMock.execute).toHaveBeenCalledWith(createBranchCommand);
      expect(ProductServiceMock.registerCustomerSale).toHaveBeenCalledWith(
        productData,
      );
      done();
    });
  });

  it('debería manejar errores de producto no encontrado', (done) => {
    // Arrange
    const productData = {
      productId: '9828eacd-01fb-45d2-91dc-24518b30b0a8',
      quantity: 100,
    } as IProductEntity;

    ProductServiceMock.findByID = jest
      .fn()
      .mockReturnValueOnce(throwError('Product not found'));

    // Act
    useCase.registercustomerSale(productData).subscribe({
      error: (error) => {
        // Assert
        expect(error).toBe('Product not found');
        expect(ProductServiceMock.findByID).toHaveBeenCalledWith(
          productData.productId,
        );
        done();
      },
    });
  });

  it('debería manejar errores de inventario insuficiente', (done) => {
    // Arrange
    const productData = [{
      productId: '9828eacd-01fb-45d2-91dc-24518b30b0a8',
      quantity: 100,
    },] as IProductEntity[];
    const branchID =  ''
    const productDatas = [{
      productId: '9828eacd-01fb-45d2-91dc-24518b30b0a8',
      quantity: 12,
    },] as IProductEntity[];

    ProductServiceMock.findByID = jest
      .fn()
      .mockReturnValueOnce(of(productDatas));

    // Act
    useCase.registerCustomerSale(productData, branchID).subscribe({
      error: (error) => {
        // Assert
        expect(error).toStrictEqual(new Error('Insufficient inventory'));
        expect(ProductServiceMock.findByID).toHaveBeenCalledWith(
          productData[1].productId,
        );
        done();
      },
    });
  });
});

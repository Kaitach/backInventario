import { of, throwError } from 'rxjs';
import {
  CommandBus,
  IProductEntity,
  ProductDomainService,
  registerquantityUseCase,
} from '../../../..';

describe('registerquantityUseCase', () => {
  let useCase: registerquantityUseCase;
  let ProductServiceMock: ProductDomainService<IProductEntity>;
  let comandBusMock: CommandBus;

  beforeEach(() => {
    ProductServiceMock = {} as ProductDomainService<IProductEntity>;
    useCase = new registerquantityUseCase(ProductServiceMock, comandBusMock);
  });

  it('debería registrar una venta  correctamente', () => {
    // Arrange
    const ProductData = {
      quantity: 100,

      productId: '9828eacd-01fb-45d2-91dc-24518b30b0a8',
    } as IProductEntity;

    useCase.execute = jest.fn().mockReturnValueOnce(of(ProductData));

    // Act
    useCase.execute(ProductData);

    // Assert
    expect(useCase.execute).toHaveBeenCalledWith(ProductData);
  });

  it('debería manejar errores de validación', () => {
    // Arrange
    const ProductData = {
      quantity: -1,

      productId: '9828eacd-01fb-45d2-91dc-24518b30b0a8',
    } as IProductEntity;

    useCase.execute = jest
      .fn()
      .mockReturnValueOnce(throwError('Error de validación'));

    // Act
    const result$ = useCase.execute(ProductData);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toBe('Error de validación');
      },
    });
  });
});

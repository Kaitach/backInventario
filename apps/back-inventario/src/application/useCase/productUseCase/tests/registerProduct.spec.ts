import { of, throwError } from 'rxjs';
import {
  BranchDomainService,
  CommandBus,
  IBranchEntiy,
  IProductEntity,
  ProductDomainService,
} from '../../../..';
import { RegisterProductUseCase } from './../registerProductUseCase';

describe('registerProductUseCase', () => {
  let useCase: RegisterProductUseCase;
  let ProductServiceMock: ProductDomainService<IProductEntity>;
  let comandBusMock: CommandBus;
  let BranchServiceMock: BranchDomainService<IBranchEntiy>;

  beforeEach(() => {
    ProductServiceMock = {} as ProductDomainService<IProductEntity>;
    useCase = new RegisterProductUseCase(
      ProductServiceMock,
      BranchServiceMock,
      comandBusMock,
    );
  });

  it('debería registrar un Product correctamente', () => {
    // Arrange
    const ProductData = {
      productName: 'fes',
      productDescription: 'rer',
      productPrice: 19.99,
      productInventoryStock: 100,
      productCategory: 'electrical',
      branchID: '9828eacd-01fb-45d2-91dc-24518b30b0a8',
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
      productName: '04',
      productDescription: 'rer',
      productPrice: 19.99,
      productInventoryStock: 0,
      productCategory: 'electrical',
      branchID: '9828eacd-01fb-45d2-91dc-24518b30b0a8',
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

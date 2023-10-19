import { getProductByIDUseCase } from '../getProductByIDUseCase';
import { of } from 'rxjs';

describe('getProductByIDUseCase', () => {
  let productUseCase;
  let productDomainServiceMock;

  beforeEach(() => {
    productDomainServiceMock = {
      findByID: jest.fn(),
    };
    productUseCase = new getProductByIDUseCase(productDomainServiceMock);
  });

  it('should call productDomainService.findByID with the provided ID and return the result', (done) => {
    // Arrange
    const productId = 'exampleProductId';
    const expectedProduct = {
      // Objeto de producto simulado
    };

    // Configurar el servicio simulado para devolver el resultado esperado
    productDomainServiceMock.findByID.mockReturnValue(of(expectedProduct));

    // Act
    const result$ = productUseCase.execute(productId);

    // Assert
    result$.subscribe((product) => {
      expect(product).toEqual(expectedProduct);
      expect(productDomainServiceMock.findByID).toHaveBeenCalledWith(productId);
      done();
    });
  });
});

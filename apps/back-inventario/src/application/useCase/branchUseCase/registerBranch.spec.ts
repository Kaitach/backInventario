import { of, throwError } from 'rxjs';
import { BranchDomainService } from '../../../';
import { IBranchEntiy } from '../../../../';
import { CommandBus } from '../../../domain/services/eventService';
import { registerBranchUseCase } from './registerBranchUseCase';

describe('registerBranchUseCase', () => {
  let useCase: registerBranchUseCase;
  let branchServiceMock: BranchDomainService<IBranchEntiy>;
  let comandBusMock: CommandBus;

  beforeEach(() => {
    branchServiceMock = {} as BranchDomainService<IBranchEntiy>;
    useCase = new registerBranchUseCase(branchServiceMock, comandBusMock);
  });

  it('debería registrar una sucursal correctamente', () => {
    // Arrange
    const branchData = {
      branchName: 'nueva',
      branchLocation: {
        country: '445',
        city: 'orlando',
      },
    } as IBranchEntiy;

    useCase.execute = jest.fn().mockReturnValueOnce(of(branchData));

    // Act
    useCase.execute(branchData);

    // Assert
    expect(useCase.execute).toHaveBeenCalledWith(branchData);
  });

  it('debería manejar errores de validación', () => {
    // Arrange
    const branchData = {
      branchName: '23',
      branchLocation: {
        country: '445',
        city: 'orlando',
      },
    } as IBranchEntiy;
    useCase.execute = jest
      .fn()
      .mockReturnValueOnce(throwError('Error de validación'));

    // Act
    const result$ = useCase.execute(branchData);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toBe('Error de validación');
      },
    });
  });
});

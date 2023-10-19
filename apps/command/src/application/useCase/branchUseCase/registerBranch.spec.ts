import { of, throwError } from 'rxjs';
import { registerBranchUseCase } from './registerBranchUseCase';
import { BranchDomainService, CommandBus, IBranchEntiy, IBranchRegister } from '../../../../../shared';

describe('registerBranchUseCase', () => {
  let branchUseCase: registerBranchUseCase;
  let branchServiceMock: BranchDomainService<IBranchEntiy>;
  let commandBusMock: CommandBus;

  beforeEach(() => {
    branchServiceMock = {} as BranchDomainService<IBranchEntiy>;
    commandBusMock = {} as CommandBus;
    branchUseCase = new registerBranchUseCase(branchServiceMock, commandBusMock);
  });

  describe('validateBranchData', () => {
    it('should validate branch data and return a branch entity', () => {
      // Arrange
      const data: IBranchRegister = {
        name: 'Branch Name',
        location: {
          city: 'City',
          country: 'Country',
        },
         
      };
      const expectedBranch: IBranchEntiy = {
        branchId: 'generated-uuid',
        name: data.name,
        location: `${data.location.city},${data.location.country}`,
        products: [],
        users: []
      };
      // Act
      const result$ = branchUseCase['validateBranchData'](expectedBranch);

      // Assert
      result$.subscribe((validatedBranch) => {
        expect(validatedBranch).toBeDefined();
        expect(validatedBranch.branchId).toBeDefined();
        expect(validatedBranch.name).toBe(data.name);
        expect(validatedBranch.location).toBe(`${data.location.city},${data.location.country}`);
      });
    });
  });

  describe('registerBranch', () => {
    it('should register a new branch and return void', () => {
      // Arrange
      const data: IBranchRegister = {
        name: 'Branch Name',
        location: {
          city: 'City',
          country: 'Country',
        },
      };

      const expectedBranch: IBranchEntiy = {
        branchId: 'generated-uuid',
        name: data.name,
        location: `${data.location.city},${data.location.country}`,
        products: [],
        users: []
      };

      // Mock the validateBranchData method to return the expected branch
      branchUseCase['validateBranchData'] = jest.fn(() => of(expectedBranch));

      // Mock the branchService RegisterBranch method to return void
      branchServiceMock.RegisterBranch = jest.fn(() => of(void 0));

      // Act
      const result$ = branchUseCase['registerBranch'](data);

      // Assert
      result$.subscribe((result) => {
        expect(result).toBeUndefined(); // The method should return void
        expect(branchServiceMock.RegisterBranch).toHaveBeenCalledWith(expectedBranch);
      });
    });

    it('should handle validation errors and return an error message', () => {
      // Arrange
      const data: IBranchRegister = {
        name: 'Branch Name',
        location: {
          city: 'City',
          country: 'Country',
        },
      };

      const validationError = 'Validation Error';

      // Mock the validateBranchData method to throw a validation error
      branchUseCase['validateBranchData'] = jest.fn(() => throwError(validationError));

      // Act
      const result$ = branchUseCase['registerBranch'](data);

      // Assert
      result$.subscribe(
        () => {
          // The method should not succeed, so this block should not be called
          fail('Expected an error but got a success');
        },
        (error) => {
          expect(error).toBe(`Error de validación: ${validationError}`);
        }
      );
    });
  });

  describe('execute', () => {
    it('should call the registerBranch method with provided data', () => {
      // Arrange
      const data: IBranchRegister = {
        name: 'Branch Name',
        location: {
          city: 'City',
          country: 'Country',
        },
      };

      // Mock the registerBranch method to return void
      branchUseCase['registerBranch'] = jest.fn(() => of(void 0));

      // Act
      const result$ = branchUseCase.execute(data);

      // Assert
      expect(branchUseCase['registerBranch']).toHaveBeenCalledWith(data);
      result$.subscribe((result) => {
        expect(result).toBeUndefined(); // The method should return void
      });
    });
  });
});

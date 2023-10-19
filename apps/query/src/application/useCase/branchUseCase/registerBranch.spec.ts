import { of, throwError } from 'rxjs';
import { registerBranchUseCase } from './registerBranchUseCase';
import { BranchDomainService, IBranchEntiy } from '../../../../../shared';

describe('registerBranchUseCase', () => {
  let branchUseCase: registerBranchUseCase;
  let branchServiceMock: BranchDomainService<IBranchEntiy>;

  beforeEach(() => {
    branchServiceMock = {} as BranchDomainService<IBranchEntiy>;
    branchUseCase = new registerBranchUseCase(branchServiceMock);
  });

  describe('registerBranch', () => {
    it('should register a new branch and return void', () => {
      // Arrange
      const data: IBranchEntiy = {
        branchId: 'generated-uuid',
        name: 'Branch Name',
        location: 'City,Country',
        products: [],
        users: [],
      };

      // Mock the branchService RegisterBranch method to return void
      branchServiceMock.RegisterBranch = jest.fn(() => of(void 0));

      // Act
      branchUseCase.registerBranch(data);

      // Assert
      expect(branchServiceMock.RegisterBranch).toHaveBeenCalledWith(data);
    });
  });


});

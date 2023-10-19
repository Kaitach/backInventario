import { of } from 'rxjs';
import { getallBranchUseCase } from '.';

describe('getallBranchUseCase', () => {
  let branchUseCase;
  let branchDomainServiceMock;

  beforeEach(() => {
    branchDomainServiceMock = {
      getAllBranch: jest.fn(),
    };
    branchUseCase = new getallBranchUseCase(branchDomainServiceMock);
  });

  it('should call branchDomainService.getAllBranch and return the result', (done) => {
    // Arrange
    const expectedBranches = [
      // Arreglo de sucursales simulado
    ];

    branchDomainServiceMock.getAllBranch.mockReturnValue(of(expectedBranches));

    // Act
    const result$ = branchUseCase.execute();

    // Assert
    result$.subscribe((branches) => {
      expect(branches).toEqual(expectedBranches);
      done();
    });
  });
});

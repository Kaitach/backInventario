import { of } from 'rxjs';
import { CommandBus, BranchDomainService, IBranchEntiy } from '../../../../../shared';
import { BranchDelegate } from '../branchDelegate';


describe('BranchDelegate', () => {
  let branchDelegate: BranchDelegate;
  let branchServiceMock: BranchDomainService<IBranchEntiy>;
  let commandBusMock: CommandBus;

  beforeEach(() => {
    branchServiceMock = {} as BranchDomainService<IBranchEntiy>;
    commandBusMock = {} as CommandBus;
    branchDelegate = new BranchDelegate(branchServiceMock, commandBusMock);
  });

  describe('registerBranch', () => {
    it('should set the delegate to registerBranchUseCase', () => {
      // Act
      branchDelegate.registerBranch();

      // Assert
      expect(branchDelegate['delegate']).toBeDefined(); // Verifica que se haya configurado el delegado
    });
  });

  describe('execute', () => {
    it('should call the execute method of the delegate with the provided arguments', () => {
      // Arrange
      const expectedResponse = { foo: 'bar' };
      const delegateMock = {
        execute: jest.fn().mockReturnValue(of(expectedResponse))
      };
      branchDelegate['delegate'] = delegateMock;

      // Act
      const result$ = branchDelegate.execute('arg1', 'arg2');

      // Assert
      expect(delegateMock.execute).toHaveBeenCalledWith('arg1', 'arg2');
      result$.subscribe((result) => {
        expect(result).toEqual(expectedResponse);
      });
    });
  });
});

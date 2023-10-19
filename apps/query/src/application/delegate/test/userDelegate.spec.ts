import { of } from 'rxjs';
import {  UserDomainService, IUserEntity, BranchDomainService, IBranchEntiy } from '../../../../../shared';
import {userDelegate} from '../'

describe('userDelegate', () => {
  let UserDelegate: userDelegate;
  let userServiceMock: UserDomainService<IUserEntity>;
  let branchServiceMock: BranchDomainService<IBranchEntiy>;

  beforeEach(() => {
    userServiceMock = {} as UserDomainService<IUserEntity>;
    branchServiceMock = {} as BranchDomainService<IBranchEntiy>;
    UserDelegate = new userDelegate(userServiceMock,  branchServiceMock);
  });

  describe('registerUser', () => {
    it('should set the delegate to registeruserUseCase', () => {
      // Act
      UserDelegate.registerUser();

      // Assert
      expect(UserDelegate['delegate']).toBeDefined(); // Verifica que se haya configurado el delegado
    });
  });

  describe('execute', () => {
    it('should call the execute method of the delegate with the provided arguments', () => {
      // Arrange
      const expectedResponse = { foo: 'bar' };
      const delegateMock = {
        execute: jest.fn().mockReturnValue(of(expectedResponse))
      };
      UserDelegate['delegate'] = delegateMock;

      // Act
      const result$ = UserDelegate.execute('arg1', 'arg2');

      // Assert
      expect(delegateMock.execute).toHaveBeenCalledWith('arg1', 'arg2');
      result$.subscribe((result) => {
        expect(result).toEqual(expectedResponse);
      });
    });
  });
});

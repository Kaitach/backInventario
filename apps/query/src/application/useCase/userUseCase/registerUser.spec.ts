import { IUserEntity } from '../../../../../shared';
import { registeruserUseCase } from './registeruserUseCase';
import { of } from 'rxjs';

describe('registeruserUseCase', () => {
  let userUseCase;
  let userDomainServiceMock;

  beforeEach(() => {
    userDomainServiceMock = {
      registerUser: jest.fn(),
    };
    userUseCase = new registeruserUseCase(userDomainServiceMock, null);
  });

  it('should call userDomainService.registerUser with the provided data and return the result', (done) => {
    // Arrange
    const userData: IUserEntity = {
      id: '123124124',
      name: 'Framco',
      password: '123441',
      email: 'faraco@gmail.com',
      role: 'Admin',
      branchId: '2421421412123'
    };
    const expectedUser = {
      id: '123124124',
      name: 'Framco',
      password: '123441',
      email: 'faraco@gmail.com',
      role: 'Admin',
      branchId: '2421421412123'
    };

    userDomainServiceMock.registerUser.mockReturnValue(of(expectedUser));

    // Act
    const result$ = userUseCase.execute(userData);

    // Assert
    result$.subscribe((user) => {
      expect(user).toEqual(expectedUser);
      expect(userDomainServiceMock.registerUser).toHaveBeenCalledWith(userData);
      done();
    });
  });
});

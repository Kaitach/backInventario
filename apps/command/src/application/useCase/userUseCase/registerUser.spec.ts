import { of } from 'rxjs';
import { registeruserUseCase } from '../'; 
import { CommandBus, IUserEntity, UserDomainService, IRegisterUser } from '../../../../../shared';

describe('registeruserUseCase', () => {
  let userUseCase: registeruserUseCase;
  let commandBusMock: CommandBus;
  let userDomainServiceMock: UserDomainService<IUserEntity>;

  beforeEach(() => {
    commandBusMock = {} as CommandBus;
    userDomainServiceMock = {} as UserDomainService<IUserEntity>;
    userUseCase = new registeruserUseCase(userDomainServiceMock, commandBusMock);
  });

  describe('registerUser', () => {
    it('should register a new user and return the user entity', () => {
      // Arrange
      const userData: IUserEntity = {
        branchId: 'branch-1',
        email: 'user@example.com',
        name: 'John',
        password: 'password123',
        role: 'user',
        id: ''
      };
      const userDataRegister: IRegisterUser = {
        branchId: 'branch-1',
        email: 'user@example.com',
        name: {
          firstName: 'John',
          lastName: 'Doe',
        },
        password: 'password123',
        role: 'user',
      };
      // Mock the validateUserData and createUserCommand methods
      userUseCase['validateUserData'] = jest.fn((data) => of(data));
      userUseCase['createUserCommand'] = jest.fn();
      // Mock the registerUser method of userDomainService
      userDomainServiceMock.registerUser = jest.fn(() => of(userData ));

      // Act
      userUseCase.registerUser(userDataRegister);

      // Assert
      expect(userUseCase['validateUserData']).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should return an error on validation failure', () => {
      // Arrange
      const userDataRegister: IRegisterUser = {
        branchId: 'branch-1',
        email: 'user@example.com',
        name: {
          firstName: 'John',
          lastName: 'Doe',
        },
        password: 'password123',
        role: 'user',
      };
    
      // Mock the validateUserData method to simulate validation error
      userUseCase['validateUserData'] = jest.fn(() => {
        throw new Error('Validation Error');
      });

      // Act and Assert
      expect(() => userUseCase.registerUser(userDataRegister)).toThrowError('Validation Error');
    });
  });

  describe('execute', () => {
    it('should call the registerUser method with provided data', () => {
      // Arrange
      const userDataRegister: IRegisterUser = {
        branchId: 'branch-1',
        email: 'user@example.com',
        name: {
          firstName: 'John',
          lastName: 'Doe',
        },
        password: 'password123',
        role: 'user',
      };
      const userData: IUserEntity = {
        branchId: 'branch-1',
        email: 'user@example.com',
        name: 'John',
        password: 'password123',
        role: 'user',
        id: ''
      };
      // Mock the registerUser method to return the data
      userUseCase['registerUser'] = jest.fn(() => of(userData));

      // Act
      userUseCase.execute(userDataRegister);

      // Assert
      expect(userUseCase['registerUser']).toHaveBeenCalledWith(expect.any(Object));
    });
  });
});

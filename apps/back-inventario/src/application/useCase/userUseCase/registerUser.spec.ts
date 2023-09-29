import { of, throwError } from 'rxjs';
import {
  BranchDomainService,
  IBranchEntiy,
  UserDomainService,
  registeruserUseCase,
} from '../../..';
import { IUserEntity } from '../../../..';
import { CommandBus } from '../../../domain/services/eventService';

describe('registerUserUseCase', () => {
  let useCase: registeruserUseCase;
  let UserServiceMock: UserDomainService<IUserEntity>;
  let comandBusMock: CommandBus;
  let BranchServiceMock: BranchDomainService<IBranchEntiy>;

  beforeEach(() => {
    UserServiceMock = {} as UserDomainService<IUserEntity>;
    useCase = new registeruserUseCase(
      UserServiceMock,
      BranchServiceMock,
      comandBusMock,
    );
  });

  it('debería registrar un user correctamente', () => {
    // Arrange
    const UserData = {
      userId: '9828eacd-01fb-45d2-91dc-24518b30b0a8',
      role: 'Admin',

      email: 'frano.rres@gmail.com',
      password: '23123asdfaF',
      username: 'awe',
      branchId: '9828eacd-01fb-45d2-91dc-24518b30b0a8',
    } as IUserEntity;

    useCase.execute = jest.fn().mockReturnValueOnce(of(UserData));

    // Act
    useCase.execute(UserData);

    // Assert
    expect(useCase.execute).toHaveBeenCalledWith(UserData);
  });

  it('debería manejar errores de validación', () => {
    // Arrange
    const UserData = {
      userId: '9828eacd-01fb-45d2-91dc-24518b30b0a8',
      role: 'Admin',

      email: 'frano.rres@gmail.com',
      password: '23123asdfaF',
      username: 'n1',
      branchId: '9828eacd-01fb-45d2-91dc-24518b30b0a8',
    } as IUserEntity;

    useCase.execute = jest
      .fn()
      .mockReturnValueOnce(throwError('Error de validación'));

    // Act
    const result$ = useCase.execute(UserData);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toBe('Error de validación');
      },
    });
  });
});

import { UserDomainService, IUserEntity } from "../../../";
import { registeruserUseCase } from "../userRegister";


describe('registeruserUseCase', () => {
  let registerUserUseCase: registeruserUseCase;
  let userService: UserDomainService<IUserEntity>; 

  beforeEach(() => {
    userService = {
      registerUser: jest.fn(),
            findByEmail: jest.fn(),

    };

    registerUserUseCase = new registeruserUseCase(userService);
  });

  it('debe estar definido', () => {
    expect(registerUserUseCase).toBeDefined();
  });

  it('debe registrar un usuario correctamente', () => {
    const userData: IUserEntity = {
        name: 'John', email: 'john@example.com',
        id: "",
        password: "",
        role: "",
        branchId: ""
    }; 

    registerUserUseCase.execute(userData);

    expect(userService.registerUser).toHaveBeenCalledWith(userData);
  });
});

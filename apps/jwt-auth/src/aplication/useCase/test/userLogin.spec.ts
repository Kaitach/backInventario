import { AuthDomainService } from '../../../domain';
import { UserDomainService } from '../../../domain/service/userDomainService';
import { of } from 'rxjs';
import { LoginUserUseCase } from '../userLogin';


describe('LoginUserUseCase', () => {
  let loginUserUseCase: LoginUserUseCase;
  let userService: UserDomainService<any>; // Reemplaza 'any' con el tipo correcto de IUserEntity
  let authService: AuthDomainService<any>; // Reemplaza 'any' con el tipo correcto de IUserEntity

  beforeEach(() => {
    userService = {
      findByEmail: jest.fn(),
      registerUser: jest.fn()
    };
    authService = {
      generateToken: jest.fn(),
    };

    loginUserUseCase = new LoginUserUseCase(userService, authService);
  });

  it('debe estar definido', () => {
    expect(loginUserUseCase).toBeDefined();
  });

  it('debe generar un token si el usuario y la contraseña son válidos', (done) => {
    const user = { email: 'test@example.com', password: 'password123' }; // Reemplaza con datos válidos
    const email = user.email;
    const password = user.password;
    const token = 'mocked-token'; 

    userService.findByEmail = jest.fn(() => of(user));
    authService.generateToken = jest.fn(() => of(token));

    loginUserUseCase.execute(email, password).subscribe((result) => {
      expect(result).toBe(token);
      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(authService.generateToken).toHaveBeenCalledWith(user);
      done();
    });
  });

  it('debe devolver null si el usuario o la contraseña no son válidos', (done) => {
    const email = 'test@example.com';
    const password = 'password123';
    
    userService.findByEmail = jest.fn(() => of(null));

    loginUserUseCase.execute(email, password).subscribe((result) => {
      expect(result).toBe(null);
      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      done();
    });
  });
});

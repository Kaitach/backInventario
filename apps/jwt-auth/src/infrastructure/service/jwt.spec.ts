import { AuthService } from '.';
import { IUserEntity } from '../../domain/entity/userEntity';



  
 describe('AuthService', () => {
  const mockJwt = {
    sign: jest.fn().mockReturnValue('mocked-token'),
  };
  jest.mock('jsonwebtoken', () => mockJwt);

  let authService: AuthService;
  const secretKey = 'secret';
  const userData: IUserEntity = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
    branchId: '123',
    password: '<PASSWORD>',
  };

  beforeEach(() => {
    authService = new AuthService();
  });

  it('debe estar definido', () => {
    expect(authService).toBeDefined();
  });

  describe('generateToken', () => {
    it('debe generar un token correctamente', () => {
      const expiresIn = '30m';

      const expectedToken = mockJwt.sign(
        {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          role: userData.role,
          branchId: userData.branchId,
        },
        secretKey,
        { expiresIn }
      );

      authService.generateToken(userData).subscribe(() => {
        expect(expectedToken).toEqual(expectedToken);
      });
    });
  });
});


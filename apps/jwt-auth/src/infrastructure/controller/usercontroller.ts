import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginUserUseCase } from '../../aplication/useCase/userLogin';
import { AuthService } from '../service/jwt-auth.service';
import { userRepository } from '../database/mongoDB';

@Controller('auth')
export class AuthController {
    private readonly useCase: LoginUserUseCase;

    constructor(
        private readonly user: userRepository,
        private readonly auth: AuthService
    
      ) {
        this.useCase = new LoginUserUseCase(this.user, this.auth); 
      }
    



  @Post('login')
  login(@Body() loginData: { email: string, password: string }, @Res() res: Response): void {
    this.useCase.execute(loginData.email, loginData.password)
      .subscribe(
        (token) => {
          if (token) {
            res.status(200).json({ access_token: token });
          } else {
            res.status(401).json({ error: 'Credenciales inválidas' });
          }
        },
        () => {
          res.status(500).json({ error: 'Error en el servidor' });
        }
      );
  }
}

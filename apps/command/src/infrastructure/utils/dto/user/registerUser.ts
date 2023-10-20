import { IRegisterUser } from '../../../../../../shared';
import { IsEmail, IsNotEmpty, IsString, Length, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class NameDto {
  @IsString({ message: 'El primer nombre debe ser una cadena' })
  @IsNotEmpty({ message: 'El primer nombre no puede estar vacío' })
  @ApiProperty({ example: 'John', description: 'Primer nombre del usuario' })
  firstName: string;

  @IsString({ message: 'El apellido debe ser una cadena' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  @ApiProperty({ example: 'Doe', description: 'Apellido del usuario' })
  lastName: string;
}

export class RegisterUserDto implements IRegisterUser {
  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email no puede estar vacío' })
  @ApiProperty({ example: 'example@email.com', description: 'Dirección de correo electrónico del usuario' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @Length(6, undefined, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @ApiProperty({ example: 'password123', description: 'Contraseña del usuario' })
  password: string;

  @IsString({ message: 'El rol debe ser una cadena' })
  @IsNotEmpty({ message: 'El rol no puede estar vacío' })
  @ApiProperty({ example: 'user', description: 'Rol del usuario' })
  role: string;

  @IsObject({ message: 'El nombre debe ser un objeto' })
  @ValidateNested()
  @Type(() => NameDto)
  @ApiProperty({ type: NameDto, description: 'Nombre del usuario' })
  name: NameDto;

  @IsString({ message: 'El branchId debe ser una cadena' })
  @IsNotEmpty({ message: 'El branchId no puede estar vacío' })
  @ApiProperty({ example: '3e5aa9e7-4b2f-4b52-b12c-70b4d592d1a4', description: 'ID de la sucursal (formato UUID)' })
  branchId: string;
}

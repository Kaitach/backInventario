import { IRegisterUser } from '../../../../../../shared';
import { IsEmail, IsNotEmpty, IsString, Length, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class NameDto {
  @IsString({ message: 'El primer nombre debe ser una cadena' })
  @IsNotEmpty({ message: 'El primer nombre no puede estar vacío' })
  firstName: string;

  @IsString({ message: 'El apellido debe ser una cadena' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  lastName: string;
}

export class RegisterUserDto  implements IRegisterUser {
  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email no puede estar vacío' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @Length(6, undefined, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsString({ message: 'El rol debe ser una cadena' })
  @IsNotEmpty({ message: 'El rol no puede estar vacío' })
  role: string;

  @IsObject({ message: 'El nombre debe ser un objeto' })
  @ValidateNested()
  @Type(() => NameDto)
  name: NameDto;

  @IsString({ message: 'El branchId debe ser una cadena' })
  @IsNotEmpty({ message: 'El branchId no puede estar vacío' })
  branchId: string;
}

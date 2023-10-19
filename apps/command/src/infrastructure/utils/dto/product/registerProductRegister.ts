/* eslint-disable prettier/prettier */

import { IsString, IsNotEmpty, IsNumber, Min, IsUUID } from 'class-validator';

export class RegisterProductDTO  {
  @IsString({ message: 'El nombre debe ser una cadena' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  name: string;

  @IsString({ message: 'La descripción debe ser una cadena' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  description: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  price: number;

  @IsString({ message: 'La categoría debe ser una cadena' })
  @IsNotEmpty({ message: 'La categoría no puede estar vacía' })
  category: string;

  @IsUUID('4', { message: 'El branchId debe ser un UUID válido' })
  branchId: string;
}
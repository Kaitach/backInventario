/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, IsUUID } from 'class-validator';

export class RegisterProductDTO  {
  @IsString({ message: 'El nombre debe ser una cadena' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @ApiProperty({ example: 'Producto 1', description: 'El nombre del producto' })
  name: string;

  @IsString({ message: 'La descripción debe ser una cadena' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  @ApiProperty({ example: 'Este es un producto de ejemplo', description: 'La descripción del producto' })
  description: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  @ApiProperty({ example: 19.99, description: 'El precio del producto' })
  price: number;

  @IsString({ message: 'La categoría debe ser una cadena' })
  @IsNotEmpty({ message: 'La categoría no puede estar vacía' })
  @ApiProperty({ example: 'Electrónica', description: 'La categoría del producto' })
  category: string;

  @IsUUID('4', { message: 'El branchId debe ser un UUID válido' })
  @ApiProperty({ example: '3e5aa9e7-4b2f-4b52-b12c-70b4d592d1a4', description: 'ID de la sucursal (formato UUID)' })
  branchId: string;
}
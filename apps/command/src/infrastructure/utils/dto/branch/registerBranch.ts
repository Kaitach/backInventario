import { IsString, IsNotEmpty, IsObject, ValidateNested, Length } from 'class-validator';
import { Type } from 'class-transformer'
import { IBranchRegister } from '../../../../../../shared';
import { ApiProperty } from '@nestjs/swagger';

class LocationDto {
  @IsString({ message: 'La ciudad debe ser una cadena' })
  @IsNotEmpty({ message: 'La ciudad no puede estar vacía' })
  @Length(4, undefined, { message: 'La ciudad debe tener al menos 4 caracteres' })
  @ApiProperty({example: 'olmos',  description: 'La ciudad', minLength: 4 })

  city: string;

  @IsString({ message: 'El país debe ser una cadena' })
  @IsNotEmpty({ message: 'El país no puede estar vacío' })
  @Length(4, undefined, { message: 'El país debe tener al menos 4 caracteres' })
  @ApiProperty({example: 'uruguay', description: 'El país', minLength: 4 })

  country: string;
}

export class RegisterBranchDto implements IBranchRegister {
  @IsString({ message: 'El nombre debe ser una cadena' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Length(4, undefined, { message: 'El nombre debe tener al menos 4 caracteres' })
  @ApiProperty({  example: 'casa central', description: 'El nombre de la sucursal', minLength: 4 })

  name: string;

  @IsObject({ message: 'La ubicación debe ser un objeto' })
  @ValidateNested()
  @Type(() => LocationDto)
  @ApiProperty({ type: LocationDto })

  location: LocationDto;
}
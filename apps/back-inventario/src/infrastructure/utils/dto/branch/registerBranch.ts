import { IBranchRegister } from './../../../../domain/interfaces/branchBaseDomainInterface';
import { IsString, IsNotEmpty, IsObject, ValidateNested, Length } from 'class-validator';
import { Type } from 'class-transformer'

class LocationDto {
  @IsString({ message: 'La ciudad debe ser una cadena' })
  @IsNotEmpty({ message: 'La ciudad no puede estar vacía' })
  @Length(4, undefined, { message: 'La ciudad debe tener al menos 4 caracteres' })
  city: string;

  @IsString({ message: 'El país debe ser una cadena' })
  @IsNotEmpty({ message: 'El país no puede estar vacío' })
  @Length(4, undefined, { message: 'El país debe tener al menos 4 caracteres' })
  country: string;
}

export class RegisterBranchDto implements IBranchRegister {
  @IsString({ message: 'El nombre debe ser una cadena' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Length(4, undefined, { message: 'El nombre debe tener al menos 4 caracteres' })
  name: string;

  @IsObject({ message: 'La ubicación debe ser un objeto' })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}
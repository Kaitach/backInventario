/* eslint-disable prettier/prettier */
import { IProductEntity } from '../../../../../../shared';
import { UUID } from 'crypto';

export interface RegisterquantityDTO extends IProductEntity {
  
  productId: UUID;
  productStock: number;
  
  branchId: string;

}

export function validateRegisterquantityDTO(dto: RegisterquantityDTO): boolean {
  if (!dto.productId) {
    throw new Error('El productId es obligatorio');
  }
  if (!dto.productStock || dto.productStock < 0) {
    throw new Error('productStock debe ser un número positivo');
  }
  return true;
}

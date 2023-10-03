/* eslint-disable prettier/prettier */
import { UUID } from 'crypto';
import { ProductTypeOrmEntity } from '../../../database';

export interface RegisterquantityDTO extends ProductTypeOrmEntity {
  productId: UUID;
  productStock: number;
}

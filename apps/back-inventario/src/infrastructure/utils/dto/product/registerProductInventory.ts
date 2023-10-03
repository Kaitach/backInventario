/* eslint-disable prettier/prettier */
import { IProductEntity } from 'apps/persistence/src';
import { UUID } from 'crypto';

export interface RegisterquantityDTO extends IProductEntity {
  productId: UUID;
  productStock: number;
}

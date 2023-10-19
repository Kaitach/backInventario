/* eslint-disable prettier/prettier */
import { ProductTypeOrmEntity } from '../../../database';

export interface RegisterProductDTO extends ProductTypeOrmEntity {
  name: string;
  description: string;
  price: number;
  category: string;
  branchId: string;
}

/* eslint-disable prettier/prettier */

import { IProductEntity } from "apps/back-inventario/src/domain/entities/productEntityDomain";

export interface RegisterProductDTO extends IProductEntity {
  name: string;
  description: string;
  price: number;
  category: string;
  branchId: string;
}

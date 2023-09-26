/* eslint-disable prettier/prettier */
import { ProductTypeOrmEntity } from "../../../database";
import { UUID } from "crypto";

export interface RegisterProductInventoryStockDTO extends ProductTypeOrmEntity {
    productId: UUID;
    productStock: number;
  }
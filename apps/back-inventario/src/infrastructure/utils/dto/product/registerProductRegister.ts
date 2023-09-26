/* eslint-disable prettier/prettier */
import { ProductTypeOrmEntity } from "../../../database";

export interface RegisterProductDTO extends ProductTypeOrmEntity {
    productName: string;
    productDescription: string;
    productPrice: number;
    productInventoryStock: number;
    productCategory: string;
  }
/* eslint-disable prettier/prettier */
import { ProductTypeOrmEntity } from "../../..";

type ProductSale = {
    productId: string;
    productPrice: number;
    productStock: number;
  };
  
  export interface RegisterSaleDTO extends ProductTypeOrmEntity {
    products: ProductSale[];
  }
/* eslint-disable prettier/prettier */
import { ProductTypeOrmEntity } from '../../..';

type ProductSale = {
  productId: string;
  price: number;
  productStock: number;
};

export interface RegisterSaleDTO extends ProductTypeOrmEntity {
  products: ProductSale[];
}

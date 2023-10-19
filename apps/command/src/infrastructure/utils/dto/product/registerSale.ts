/* eslint-disable prettier/prettier */
import { IProductEntity } from '../../../../../../shared';

type ProductSale = {
  productId: string;
  price: number;
  productStock: number;
  branchId: string;

};

export interface RegisterSaleDTO extends IProductEntity {
  products: ProductSale[];
}

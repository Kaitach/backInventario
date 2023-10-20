/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IProductEntity } from '../../../../../../shared';

  class ProductSale  {
  @ApiProperty({ example: 'ID-del-producto', description: 'ID del producto (formato UUID)' })

  productId: string;
  @ApiProperty({ example: 19.99, description: 'Precio del producto' })
  price: number;

  @ApiProperty({ example: 10, description: 'Stock del producto' })
  productStock: number;

  @ApiProperty({ example: 'ID-de-la-sucursal', description: 'ID de la sucursal (formato UUID)' })
  branchId: string;

};

export interface RegisterSaleDTO extends IProductEntity {
  products: ProductSale[];
}

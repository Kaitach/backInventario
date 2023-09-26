/* eslint-disable prettier/prettier */
import { IProductEntity } from "apps/back-inventario/src/domain/entities/productEntityDomain";
import { UUID } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('product')
export class ProductTypeOrmEntity implements IProductEntity {
  @PrimaryGeneratedColumn('uuid')
  productId: UUID;

  @Column()
  productName: string;

  @Column()
  productDescription: string;

  @Column()
  productPrice: number;

  @Column()
  productInventoryStock: number;

  @Column()
  productCategory: string;
}
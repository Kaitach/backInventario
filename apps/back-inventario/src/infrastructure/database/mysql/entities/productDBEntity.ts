/* eslint-disable prettier/prettier */
import { IProductEntity } from "apps/back-inventario/src/domain/entities/productEntityDomain";
import { UUID } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BranchTypeOrmEntity } from "./branchDBEntity";

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

  @ManyToOne(() => BranchTypeOrmEntity, branch => branch.branchProducts)
  branchID: string;
}
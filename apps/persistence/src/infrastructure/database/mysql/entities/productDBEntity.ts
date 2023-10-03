/* eslint-disable prettier/prettier */
import { UUID } from 'crypto';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IProductEntity } from '../../../../../../back-inventario/src/domain/entities/productEntityDomain';
import { BranchTypeOrmEntity } from './branchDBEntity';

@Entity('product')
export class ProductTypeOrmEntity implements IProductEntity {
  @PrimaryGeneratedColumn('uuid')
  productId: UUID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  category: string;
  
  @Column()
  @ManyToOne(() => BranchTypeOrmEntity, (branch) => branch.products)
  branchId: string;
}

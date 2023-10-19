/* eslint-disable prettier/prettier */

import { UUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductTypeOrmEntity } from './productDBEntity';
import { UserTypeOrmEntity } from './userDBentity';
import { SaleTypeOrmEntity } from './salesDBEntity';
import { IBranch } from '../../../../../../shared';

@Entity('branch')
export class BranchTypeOrmEntity implements IBranch {
  @PrimaryGeneratedColumn('uuid')
  branchId: UUID;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToMany(() => ProductTypeOrmEntity, (product) => product.branchId)
  products: ProductTypeOrmEntity[];

  @OneToMany(() => UserTypeOrmEntity, (user) => user.branchId)
  users: UserTypeOrmEntity[];

  @OneToMany(() => SaleTypeOrmEntity, (sale) => sale.branchId)
  sales: SaleTypeOrmEntity[];
}

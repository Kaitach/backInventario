/* eslint-disable prettier/prettier */

import { IBranch } from 'apps/back-inventario/src/domain/interfaces/branchInterfaceDomain';
import { UUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductTypeOrmEntity } from './productDBEntity';
import { UserTypeOrmEntity } from './userDBentity';
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
}

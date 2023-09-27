/* eslint-disable prettier/prettier */


import { UUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductTypeOrmEntity } from './productDBEntity';
import { UserTypeOrmEntity } from './userDBentity';
import { IBranch } from 'apps/back-inventario/src/domain/interfaces/branchInterfaceDomain';
@Entity('branch')
export class BranchTypeOrmEntity implements IBranch {
  @PrimaryGeneratedColumn('uuid')
  branchID: UUID;

  @Column()
  branchName: string;

  @Column('json') 
  branchLocation: string;

  @OneToMany(() => ProductTypeOrmEntity, product => product.branchID)
  branchProducts: ProductTypeOrmEntity[];
  
  @OneToMany(() => UserTypeOrmEntity, user => user.branchID)
  branchEmployees: UserTypeOrmEntity[];
}

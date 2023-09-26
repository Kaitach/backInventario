/* eslint-disable prettier/prettier */


import { IProductEntity } from 'apps/back-inventario/src/domain/entities/productEntityDomain';
import { IUserEntity } from 'apps/back-inventario/src/domain/entities/userEntityDomain';
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

  @OneToMany(() => ProductTypeOrmEntity, product => product.productId)
  branchProducts: IProductEntity[];

  @OneToMany(() => UserTypeOrmEntity, user => user.userId)
  branchEmployees: IUserEntity[];
}

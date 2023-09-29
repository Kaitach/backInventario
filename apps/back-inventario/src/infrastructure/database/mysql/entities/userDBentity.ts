/* eslint-disable prettier/prettier */
import { UUID } from 'crypto';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IUserEntity } from '../../../../../../back-inventario/src/domain/entities/userEntityDomain';
import { BranchTypeOrmEntity } from './branchDBEntity';
import { RegisterUserDto } from '../../../utils';

@Entity('user')
export class UserTypeOrmEntity implements IUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @ManyToOne(() => BranchTypeOrmEntity, (branch) => branch.users)
  branchId: string;

 
}

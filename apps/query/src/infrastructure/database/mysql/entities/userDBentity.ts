/* eslint-disable prettier/prettier */
import { UUID } from 'crypto';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IUserEntity } from '../../../../../../shared';
import { BranchTypeOrmEntity } from './branchDBEntity';

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
  
  @Column()
  @ManyToOne(() => BranchTypeOrmEntity, (branch) => branch.users)
  branchId: string;

 
}

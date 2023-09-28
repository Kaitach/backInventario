/* eslint-disable prettier/prettier */
import { IUserEntity } from "../../../../../../back-inventario/src/domain/entities/userEntityDomain";
import { UUID } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BranchTypeOrmEntity } from "./branchDBEntity";

@Entity('user')
export class UserTypeOrmEntity implements IUserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: UUID;

  @Column()
  username: string;

  @Column()
  userPassword: string;

  @Column()
  userEmail: string;

  @Column()
  userRole: string;

  @ManyToOne(() => BranchTypeOrmEntity, branch => branch.branchEmployees)
  branchID: string;
}
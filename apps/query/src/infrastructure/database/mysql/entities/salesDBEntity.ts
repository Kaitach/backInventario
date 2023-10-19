import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { BranchTypeOrmEntity } from './branchDBEntity';
import { ISale } from '../../../../../../shared';
  
  @Entity('sale')
  export class SaleTypeOrmEntity implements ISale {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ default: '' })
    date: string;
  
    @Column()
    invoiceNumber: string;
  
    @Column()
    type: string;
  
    @Column({ type: 'text' })
    productName: string[];
  
    @Column() 
    productPrice: number;
  
    @Column(  )
    quantity: number;

    @ManyToOne(() => BranchTypeOrmEntity, (branch) => branch.sales)
    @JoinColumn({ name: 'branchId' }) 
    branchId: string; 

  }
  
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { BranchTypeOrmEntity } from './branchDBEntity';
import { ISale } from 'apps/persistence/src/domain/interfaces/sale.interface';
  
  @Entity('sale')
  export class SaleTypeOrmEntity implements ISale {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
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
  
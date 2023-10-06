import { v4 as uuidv4 } from 'uuid';
import { ISale } from '../interfaces/sale.interface';
import { IBranch } from '../interfaces';


export class SaleEntity implements ISale {
  branch: IBranch;
  type: string;
  id: string;
  productName: string[];
  invoiceNumber: string;
  productPrice: number;
  quantity: number;

  constructor(data: Partial<ISale>) {
    this.id = uuidv4();
    this.invoiceNumber = data.invoiceNumber || '';
    this.productPrice = data.productPrice || 0;
    this.quantity = data.quantity || 0;
  }
  branchId: string;
  
  date: string;

}

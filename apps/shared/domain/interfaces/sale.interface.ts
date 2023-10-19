
export interface ISale {
  id?: string;
  branchId: string;
  invoiceNumber: string;
  type: string;
  productName: string[];
  productPrice: number;
  quantity: number;
  date: string
}

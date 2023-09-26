/* eslint-disable prettier/prettier */
import { IProduct } from "../interfaces/productInterfaceDomain";

export class IProductEntity  implements IProduct{
    productId:  string;
    productName:  string;
    productDescription:  string;
    productPrice:  number ;
    productInventoryStock:  number ;
    productCategory:  string;
  
    constructor(
      productName: string,
      productDescription: string,
      productPrice: number,
      productInventoryStock: number,
      productCategory: string
    ) {
      this.productName = productName;
      this.productDescription = productDescription;
      this.productPrice = productPrice;
      this.productInventoryStock = productInventoryStock;
      this.productCategory = productCategory;
    }}
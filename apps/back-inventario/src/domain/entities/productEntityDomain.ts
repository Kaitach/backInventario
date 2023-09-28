/* eslint-disable prettier/prettier */
import { IProduct } from "../interfaces/productInterfaceDomain";
import { IdValueObject, ProductCategoryValueObject, ProductDescriptionValueObject, ProductInventoryStockValueObject, ProductNameValueObject, ProductPriceValueObject } from "../value-objects";

export class IProductEntity  implements IProduct{
    productId:  string;
    productName:  string;
    productDescription:  string;
    productPrice:  number ;
    productInventoryStock:  number ;
    productCategory:  string;
    branchID: string

    constructor(data: IProduct) {
      this.productId = data.productId ? new IdValueObject(data.productId).valueOf() : '';
      this.productName = data.productName ? new ProductNameValueObject(data.productName).valueOf() : '';
      this.productDescription = data.productDescription ? new ProductDescriptionValueObject(data.productDescription).valueOf() : '';
      this.productPrice = data.productPrice ? new ProductPriceValueObject(data.productPrice).valueOf() : 0;
      this.productInventoryStock = data.productInventoryStock ? new ProductInventoryStockValueObject(data.productInventoryStock).valueOf() : 0;
      this.productCategory = data.productCategory ? new ProductCategoryValueObject(data.productCategory).valueOf() : '';
      this.branchID = data.branchID ? new IdValueObject(data.branchID).valueOf() : '';
    }}
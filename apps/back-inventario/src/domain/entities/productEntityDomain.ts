/* eslint-disable prettier/prettier */
import { v4 as uuidv4 } from 'uuid';
import { IProduct } from '../interfaces/productInterfaceDomain';
import { IdValueObject, nameValueObject } from '../..';
import { descriptionValueObject, priceValueObject, quantityValueObject, categoryValueObject } from '../value-objects/product';

export class IProductEntity implements IProduct {
  productId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  branchId: string;

  constructor(data: IProduct) {
    if (data.productId)
      this.productId = new IdValueObject(data.productId).valueOf();
    else this.productId = new IdValueObject(uuidv4()).valueOf();
    this.name = data.name ? new nameValueObject(data.name).valueOf() : '';
    this.description = data.description
      ? new descriptionValueObject(data.description).valueOf()
      : '';
    this.price = data.price ? new priceValueObject(data.price).valueOf() : 0;
    this.quantity = data.quantity
      ? new quantityValueObject(data.quantity).valueOf()
      : 0;
    this.category = data.category
      ? new categoryValueObject(data.category).valueOf()
      : '';
    this.branchId = data.branchId
      ? new IdValueObject(data.branchId).valueOf()
      : '';
  }
}

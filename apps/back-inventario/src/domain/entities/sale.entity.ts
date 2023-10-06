import { v4 as uuidv4 } from 'uuid';
import { ISale } from '../interfaces/sale.interface';
import { IdValueObject, nameValueObject } from '../value-objects';
import { priceValueObject, quantityValueObject } from '../value-objects/product';


export class SaleEntity {
  id?: IdValueObject;
  productName: nameValueObject;
  invoiceNumber: IdValueObject;
  productPrice: priceValueObject;
  quantity: quantityValueObject;

  constructor(data: ISale) {
    if (data.id) this.id = new IdValueObject(data.id);
    else this.id = new IdValueObject(uuidv4());

    this.invoiceNumber = new IdValueObject(data.invoiceNumber);
    this.productPrice = new priceValueObject(data.productPrice);
    this.quantity = new quantityValueObject(data.quantity);
  }
}

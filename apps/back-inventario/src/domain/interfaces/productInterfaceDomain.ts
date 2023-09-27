/* eslint-disable prettier/prettier */
import { IdValueObject } from "../value-objects/id-uuid-value";
import { ProductNameValueObject } from "../value-objects/product/product-name.value-object";
import { ProductPriceValueObject } from '../value-objects/product/product-price.value-object';
import { ProductInventoryStockValueObject } from '../value-objects/product/product-inventory-stock.value-object';
import { ProductDescriptionValueObject } from './../value-objects/product/product-description.value-object';
import { ProductCategoryValueObject } from "../value-objects/product/product-category.value-object";

export interface IProduct {
    productId: IdValueObject | string;
    productName: ProductNameValueObject | string;
    productDescription: ProductDescriptionValueObject | string;
    productPrice: ProductPriceValueObject | number ;
    productInventoryStock: ProductInventoryStockValueObject | number ;
    productCategory: ProductCategoryValueObject | string;
    branchID: string

  }
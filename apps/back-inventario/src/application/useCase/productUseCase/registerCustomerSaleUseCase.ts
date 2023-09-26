/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { IProductEntity } from "apps/back-inventario/src/domain";
import { Observable, catchError, map, mergeMap, switchMap, throwError } from "rxjs";
import { ProductDomainService } from './../../../domain/services/productServiceDomain';
import { ProductInventoryStockValueObject } from "apps/back-inventario/src/domain/value-objects/product/product-inventory-stock.value-object";
import { ProductPriceValueObject } from "apps/back-inventario/src/domain/value-objects/product/product-price.value-object";

@Injectable()
export class registerCustomerSaleUseCase {
    constructor(private readonly productDomainService: ProductDomainService<IProductEntity>) { }
  
    private validateProductData(data: IProductEntity): Observable<string[]> {
      const productPriceValueObject = new ProductPriceValueObject(data.productPrice);
      const productInventoryStockValueObject = new ProductInventoryStockValueObject(data.productInventoryStock);
  
      productPriceValueObject.validateData();
      productInventoryStockValueObject.validateData();
  
  
   
  
  
      if (productPriceValueObject.errorValidate()) {
        productPriceValueObject.errorMessage    }
  
      if (productInventoryStockValueObject.errorValidate()) {
        productInventoryStockValueObject.errorMessage    }
  
  
        return new Observable<string[]>(observer => {
          observer.next([]);
          observer.complete();
        });
    }
  
    registercustomerSale(data: IProductEntity): Observable<IProductEntity> {
      return this.productDomainService.findByID(data.productId as string).pipe(
        catchError(() => throwError('Product not found')),
        map((product) => {
          if (!product) {
            throw new Error('Product not found');
          }
  
          if (product.productInventoryStock < data.productInventoryStock) {
            throw new Error('Insufficient inventory');
          }
  
          product.productInventoryStock = +product.productInventoryStock - +data.productInventoryStock;
          return this.productDomainService.registerCustomerSale(product);
        }),
        mergeMap((savedProduct) => savedProduct),
      );
    }
  
    execute(data: { productId: string; productPrice: number; productInventoryStock: number }): Observable<IProductEntity> {
      const { productId, productPrice, productInventoryStock } = data;
      const productEntity: IProductEntity = {
        productId,
        productPrice,
        productInventoryStock,
        productName: "",
        productDescription: "",
        productCategory: ""
      };
  
      return this.validateProductData(productEntity).pipe(
        switchMap(() => this.registercustomerSale(productEntity)),
        catchError(error => throwError(`Validation error: ${error}`))
      );
    }
  }
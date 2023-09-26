/* eslint-disable prettier/prettier */
import {  Injectable } from "@nestjs/common";
import { IProductEntity } from "apps/back-inventario/src/domain";
import { Observable, catchError, map, mergeMap, throwError } from "rxjs";
import { ProductDomainService } from './../../../domain/services/productServiceDomain';
import { RegisterProductInventoryStockDTO } from "apps/back-inventario/src/infrastructure/utils/dto/product/registerProductInventory";
import { ProductInventoryStockValueObject } from "apps/back-inventario/src/domain/value-objects/product/product-inventory-stock.value-object";

@Injectable()
export class registerProductInventoryStockUseCase {
  constructor(private readonly productDomainService: ProductDomainService<IProductEntity>) { }

  private validateProductData(data: IProductEntity): Observable<void> {
    const productInventoryStockValueObject = new ProductInventoryStockValueObject(data.productInventoryStock);
    productInventoryStockValueObject.validateData();

    if (productInventoryStockValueObject.errorValidate()) {
      productInventoryStockValueObject.errorMessage
        }

    return new Observable<void>(observer => {
      observer.next();
      observer.complete();
    });
  }

  registerProductInventoryStock(data: IProductEntity): Observable<IProductEntity> {
    return this.validateProductData(data).pipe(
      mergeMap(() => {
        if (data.productInventoryStock < 0) {
          return throwError("Product stock cannot be negative");
        }

        return this.productDomainService.findByID(data.productId).pipe(
          catchError(() => throwError('Product not found')),
          map((product) => {
            if (!product) {
              throw new Error('Product not found');
            }

            product.productInventoryStock += data.productInventoryStock;

            return this.productDomainService.registerProduct(product);
          }),
          mergeMap((savedProduct) => savedProduct),
        );
      })
    );
  }

  execute(data: RegisterProductInventoryStockDTO): Observable<IProductEntity> {
    return this.registerProductInventoryStock(data);
  }
}

/* eslint-disable prettier/prettier */
import { IProductEntity } from "apps/back-inventario/src/domain";
import { Observable, catchError, map, mergeMap, of, switchMap, throwError } from "rxjs";
import { ProductDomainService } from './../../../domain/services/productServiceDomain';
import { ProductInventoryStockValueObject } from "apps/back-inventario/src/domain/value-objects/product/product-inventory-stock.value-object";

export class registerProductInventoryStockUseCase {
  constructor(private readonly productDomainService: ProductDomainService<IProductEntity>) { }

  private validateProductData(data: IProductEntity): Observable<IProductEntity> {
    const productInventoryStockValueObject = new ProductInventoryStockValueObject(data.productInventoryStock);
    productInventoryStockValueObject.validateData();


    const validatedProduct: IProductEntity = {
      ...data, 
      productInventoryStock: productInventoryStockValueObject.valueOf()
    };
  
    return of(validatedProduct); 
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

  execute(data: IProductEntity): Observable<IProductEntity> {
    return this.validateProductData(data).pipe(
      switchMap((validatedProduct) => this.registerProductInventoryStock(validatedProduct)),
      catchError(error => throwError(`Validation error: ${error}`))
    );  }
}

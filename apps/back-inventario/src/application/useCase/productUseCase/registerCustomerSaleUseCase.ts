/* eslint-disable prettier/prettier */
import { IProductEntity } from "apps/back-inventario/src/domain";
import { Observable, catchError, map, mergeMap, of, switchMap, throwError } from "rxjs";
import { ProductDomainService } from './../../../domain/services/productServiceDomain';
import { ProductInventoryStockValueObject } from "apps/back-inventario/src/domain/value-objects/product/product-inventory-stock.value-object";
import { ProductPriceValueObject } from "apps/back-inventario/src/domain/value-objects/product/product-price.value-object";
import { CommandBus } from "apps/back-inventario/src/domain/services/eventService";
import { newProductSalecommand } from "apps/back-inventario/src/domain/events/commands/newProdcutSaleCommand";

export class registerCustomerSaleUseCase {
    constructor(private readonly productDomainService: ProductDomainService<IProductEntity>,private readonly comandBus: CommandBus,) { }
  
  
    private validateProductData(data: IProductEntity): Observable<IProductEntity> {
      const productPriceValueObject = new ProductPriceValueObject(data.productPrice);
      const productInventoryStockValueObject = new ProductInventoryStockValueObject(data.productInventoryStock);
  
      productPriceValueObject.validateData();
      productInventoryStockValueObject.validateData();
  
      const validatedProduct: IProductEntity = {
        ...data, 
        productPrice: productPriceValueObject.valueOf(),
        productInventoryStock: productInventoryStockValueObject.valueOf()
      };
    
      return of(validatedProduct); 
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
          const createBranchCommand = new newProductSalecommand(data);
          this.comandBus.execute(createBranchCommand)
          return this.productDomainService.registerCustomerSale(product);
        }),
        mergeMap((savedProduct) => savedProduct),
      );
    }
  
    execute(data: IProductEntity): Observable<IProductEntity> {
      return this.validateProductData(data).pipe(
        switchMap((validatedProduct) => this.registercustomerSale(validatedProduct)),
        catchError(error => throwError(`Validation error: ${error}`))
      );  }
  }
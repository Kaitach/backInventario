/* eslint-disable prettier/prettier */
import { IProductEntity } from "../../../../../";;
import { Observable, catchError, map, mergeMap, of, switchMap, throwError } from "rxjs";
import { ProductDomainService } from './../../../domain/services/productServiceDomain';
import { CommandBus } from "../../../../../";;
import { newProductSalecommand } from "../../../../../";

export class registerCustomerSaleUseCase {
    constructor(private readonly productDomainService: ProductDomainService<IProductEntity>,private readonly comandBus: CommandBus,) { }
  
  
    private validateProductData(data: IProductEntity): Observable<IProductEntity> {
      const validatedProduct = new IProductEntity(data);

    return of(validatedProduct);
    }
  
    registercustomerSale(data: IProductEntity): Observable<IProductEntity> {
      return this.productDomainService.findByID(data.productId as string).pipe(
        catchError(() => throwError('Product not found')),
        map((product) => {
          if (!product) {
            catchError(() => throwError('Product not found'))

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
        switchMap((validatedProduct) => this.registercustomerSale(validatedProduct))
      );
    }
  }
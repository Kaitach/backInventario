/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ProductDomainService, IProductEntity, BranchDomainService, IBranchEntiy } from "apps/back-inventario/src/domain";
import { ProductCategoryValueObject } from "apps/back-inventario/src/domain/value-objects/product/product-category.value-object";
import { ProductDescriptionValueObject } from "apps/back-inventario/src/domain/value-objects/product/product-description.value-object";
import { ProductInventoryStockValueObject } from "apps/back-inventario/src/domain/value-objects/product/product-inventory-stock.value-object";
import { ProductNameValueObject } from "apps/back-inventario/src/domain/value-objects/product/product-name.value-object";
import { ProductPriceValueObject } from "apps/back-inventario/src/domain/value-objects/product/product-price.value-object";
import { Observable, throwError, switchMap, catchError } from "rxjs";

@Injectable()
export class RegisterProductUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<IProductEntity>,
    private readonly branchDomainService: BranchDomainService<IBranchEntiy>
  ) {}

  private validateProductData(data: IProductEntity): Observable<void> {
    const productNameValueObject = new ProductNameValueObject(data.productName);
    const productDescriptionValueObject = new ProductDescriptionValueObject(data.productDescription);
    const productPriceValueObject = new ProductPriceValueObject(data.productPrice);
    const productInventoryStockValueObject = new ProductInventoryStockValueObject(data.productInventoryStock);
    const productCategoryValueObject = new ProductCategoryValueObject(data.productCategory);

    productNameValueObject.validateData();
    productDescriptionValueObject.validateData();
    productPriceValueObject.validateData();
    productInventoryStockValueObject.validateData();
    productCategoryValueObject.validateData();

    const validationErrors: string[] = [];

    if (productNameValueObject.errorValidate()) {
      validationErrors.push(productNameValueObject.errorMessage);
    }

    if (productDescriptionValueObject.errorValidate()) {
      validationErrors.push(productDescriptionValueObject.errorMessage);
    }

    if (productPriceValueObject.errorValidate()) {
      validationErrors.push(productPriceValueObject.errorMessage);
    }

    if (productInventoryStockValueObject.errorValidate()) {
      validationErrors.push(productInventoryStockValueObject.errorMessage);
    }

    if (productCategoryValueObject.errorValidate()) {
      validationErrors.push(productCategoryValueObject.errorMessage);
    }

    if (validationErrors.length > 0) {
      return throwError(`Validation errors: ${validationErrors.join(", ")}`);
    }

    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }

  private validateBranchExistence(branchId: string): Observable<boolean> {
    return this.branchDomainService.findBranchById(branchId).pipe(
      switchMap((branch) => {
        if (branch) {
          return new Observable<boolean>((observer) => {
            observer.next(true); // La sucursal existe
            observer.complete();
          });
        } else {
          return throwError("La sucursal no existe.");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  registerProduct(data: IProductEntity): Observable<IProductEntity> {
    return this.validateBranchExistence(data.branchID).pipe(
      switchMap(() => this.validateProductData(data)),
      switchMap(() => this.productDomainService.registerProduct(data)),
      catchError((error) => throwError(`Registration error: ${error}`))
    );
  }

  execute(data: IProductEntity): Observable<IProductEntity> {
    return this.registerProduct(data);
  }
}

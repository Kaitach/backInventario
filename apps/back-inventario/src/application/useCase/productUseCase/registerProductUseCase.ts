/* eslint-disable prettier/prettier */
import { ProductDomainService, IProductEntity, BranchDomainService, IBranchEntiy } from "apps/back-inventario/src/domain";
import { newProductCommand } from "apps/back-inventario/src/domain/events/commands/newProductCommand";
import { CommandBus } from "apps/back-inventario/src/domain/services/eventService";
import { ProductCategoryValueObject } from "apps/back-inventario/src/domain/value-objects/product/product-category.value-object";
import { ProductDescriptionValueObject } from "apps/back-inventario/src/domain/value-objects/product/product-description.value-object";
import { ProductInventoryStockValueObject } from "apps/back-inventario/src/domain/value-objects/product/product-inventory-stock.value-object";
import { ProductNameValueObject } from "apps/back-inventario/src/domain/value-objects/product/product-name.value-object";
import { ProductPriceValueObject } from "apps/back-inventario/src/domain/value-objects/product/product-price.value-object";
import { Observable, throwError, switchMap, catchError, of, map } from "rxjs";

export class RegisterProductUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<IProductEntity>,
    private readonly branchDomainService: BranchDomainService<IBranchEntiy>,private readonly comandBus: CommandBus,
  ) {}

  private validateProductData(data: IProductEntity): Observable<IProductEntity> {
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

  

    const validatedProduct: IProductEntity = {
      ...data, 
      productPrice: productPriceValueObject.valueOf(),
      productInventoryStock: productInventoryStockValueObject.valueOf(),
      productName: productNameValueObject.valueOf(),
      productCategory: productCategoryValueObject.valueOf(),
      productDescription: productDescriptionValueObject.valueOf(),
      
    };
  
    return of(validatedProduct); 
  }

  private validateBranchExistence(branchId: string): Observable<boolean> {
    return this.branchDomainService.findBranchById(branchId).pipe(
      map(branch => !!branch),
      catchError(() => of(false)) 
    );
  }

  registerProduct(data: IProductEntity): Observable<IProductEntity> {
    const createBranchCommand = new newProductCommand(data);
        this.comandBus.execute(createBranchCommand)
    return this.validateBranchExistence(data.branchID).pipe(
      switchMap(() => this.validateProductData(data)),
      switchMap(() => this.productDomainService.registerProduct(data)),
      
      catchError((error) => throwError(`Registration error: ${error}`))
    );
  }

  execute(data: IProductEntity): Observable<IProductEntity> {
    return this.validateProductData(data).pipe(
      switchMap((validatedProduct) => this.registerProduct(validatedProduct)),
      catchError(error => throwError(`Validation error: ${error}`))
    );  }
}

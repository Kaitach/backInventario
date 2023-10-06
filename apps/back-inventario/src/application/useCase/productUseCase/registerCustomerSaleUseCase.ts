/* eslint-disable prettier/prettier */
import {
  Observable,
  
} from 'rxjs';
import {
  IProductEntity,
} from '../../../../../';
import { ProductDomainService } from './../../../domain/services/productServiceDomain';
import { CommandBus } from 'apps/back-inventario';
import { ISale } from 'apps/back-inventario/src/domain/interfaces/sale.interface';
import { v4 as uuidv4 } from 'uuid';


export class registerCustomerSaleUseCase {
  constructor(
    private readonly commandBus: CommandBus,private readonly productDomainService: ProductDomainService<IProductEntity>,
  ) {}

  registerCustomerSale(product: IProductEntity[], branchId: string): Observable<ISale> {
console.log(product)
    const exchange = 'productInventory';
    const routingKey = 'eventRegister';
    let totalPrice = 0;
    let totalQuantity = 0;
    const productNamesWithQuantity: string[] = [];

    product.forEach((product) => {
      totalPrice += product.price;
      totalQuantity += product.quantity;
      productNamesWithQuantity.push(`${product.name} (${product.quantity})`);

    });
    
    const productNames = productNamesWithQuantity.join(', ');

    const saleData: ISale = {
      branchId,
      productName: productNames as unknown as string [], 
      invoiceNumber:  uuidv4(), 
      productPrice: (totalPrice * 1.22 ),
      quantity: totalQuantity,
      type: 'customerSales',
      date: new Date().toISOString(),
    };

    this.commandBus.registerSale(exchange, routingKey, saleData, branchId);

    product.forEach((product) => {
      const productExchange = 'productInventory';
      const productRoutingKey = 'new.product.customerSale'; 
      product.branchId = branchId
      console.log('abajo')

      console.log(product)
      console.log('arriba')

      this.commandBus.registerCustomerSale(productExchange, productRoutingKey, product, branchId);
    });


    return this.productDomainService.registerCustomerSale(saleData);
  }
  
  execute(products: IProductEntity[], branchId: string): Observable<ISale> {
    return this.registerCustomerSale(products, branchId);
  }
}
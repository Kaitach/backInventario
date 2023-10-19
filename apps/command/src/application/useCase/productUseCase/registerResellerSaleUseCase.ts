import {
  Observable,
  

} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CommandBus, IProductEntity, ISale, ProductDomainService } from '../../../../../shared';



export class RegisterResellerSaleUseCase {
  constructor(
    private readonly productDomainService: ProductDomainService<ISale>,
    private readonly commandBus: CommandBus,
  ) {}


  registerResellerSale(product: IProductEntity[], branchId: string): Observable<ISale> {
    const exchange = 'productInventory'
    const routingKey = 'saleEvent'

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
      productPrice: (totalPrice * 1.15 ),
      quantity: totalQuantity,
      type: 'resellerSales',
      date: new Date().toISOString(),
    };

    this.commandBus.registerSale(exchange, routingKey, saleData, branchId);

    product.forEach((product) => {
      const productExchange = 'productInventory'; 
      const productRoutingKey = 'productRegister';

      this.commandBus.registerSellerSale(productExchange, productRoutingKey, product, branchId);
    });


    return this.productDomainService.registerResellerSale(saleData);
  }

  execute(product: IProductEntity[], branchId: string): Observable<ISale> {
    return this.registerResellerSale(product, branchId);
  }
}

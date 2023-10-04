/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { productDelegate } from '../../application/delegate/productDelegate';
import { IProductEntity } from '../../domain';
import { infrastructureServiceProduct } from '../service/infrastructure.service';
import { RegisterquantityDTO } from '../utils/dto/product/registerProductInventory';
import { RegisterProductDTO } from '../utils/dto/product/registerProductRegister';
import { RegisterSaleDTO } from '../utils/dto/product/registerSale';
import { MessagingService } from '../events/service/serviceEvent';

@Controller('api/v1/product')
export class ProductController {
  private readonly useCase: productDelegate;

  constructor(
    private readonly productService: infrastructureServiceProduct,
    private readonly commandBus: MessagingService,

  ) {
    this.useCase = new productDelegate(
      this.productService,
      this.commandBus,
    );
  }

  @Post('register')
  registerProduct(
    @Body() product: RegisterProductDTO,
  ): Observable<void> {
    this.useCase.registerProduct();
    return this.useCase.execute(product);
  }
  @Post('customer-sale/:idProduct')
  registerCustomerSale(
    @Param('idProduct') idProduct: string,
    @Body() product: RegisterSaleDTO,
  ): Observable<void> {
    this.useCase.registerCustomerSale();
    return this.useCase.execute(product, idProduct);
  }
  @Post('seller-sale/:idProduct')
  registerResellerSale(
    @Param('idProduct') idProduct: string,
    @Body() product: RegisterSaleDTO,
  ): Observable<void> {
    this.useCase.registerResellerSale();
    return this.useCase.execute(product, idProduct);
  }
  @Post('purchase/:idProduct')
  registerquantity(
    @Param('idProduct') idProduct: string,
    @Body() product: RegisterquantityDTO,
  ): Observable<void> {
    this.useCase.registerquantity();
    return this.useCase.execute(product, idProduct);
  }
  @Get(':id')
  findById(@Param('id') id: string): Observable<IProductEntity> {
    return this.productService.findByID(id);
  }


  @Get()
  getAll(): Observable<void[]> {
    return this.productService.getAll();
  }
}

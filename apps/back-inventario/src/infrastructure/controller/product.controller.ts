/* eslint-disable prettier/prettier */
import { CommandBus } from '@nestjs/cqrs';
/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { productServiceBD } from '..';
import { productDelegate } from '../../application/delegate/productDelegate';
import { ProductTypeOrmEntity, branchServiceBD } from '../database';
import { RegisterquantityDTO } from '../utils/dto/product/registerProductInventory';
import { RegisterProductDTO } from '../utils/dto/product/registerProductRegister';
import { RegisterSaleDTO } from '../utils/dto/product/registerSale';

@Controller('api/v1/product')
export class ProductController {
  private readonly useCase: productDelegate;

  constructor(
    private readonly productService: productServiceBD,
    private readonly commandBus: CommandBus,
    private readonly brancService: branchServiceBD,
  ) {
    this.useCase = new productDelegate(
      this.productService,
      this.commandBus,
      this.brancService,
    );
  }

  @Post('register')
  registerProduct(
    @Body() product: RegisterProductDTO,
  ): Observable<ProductTypeOrmEntity> {
    this.useCase.registerProduct();
    return this.useCase.execute(product);
  }
  @Post('customer-sale/:idProduct')
  registerCustomerSale(
    @Param('idProduct') idProduct: string,
    @Body() product: RegisterSaleDTO,
  ): Observable<ProductTypeOrmEntity> {
    this.useCase.registerCustomerSale();
    return this.useCase.execute(product, idProduct);
  }
  @Post('seller-sale/:idProduct')
  registerResellerSale(
    @Param('idProduct') idProduct: string,
    @Body() product: RegisterSaleDTO,
  ): Observable<ProductTypeOrmEntity> {
    this.useCase.registerResellerSale();
    return this.useCase.execute(product, idProduct);
  }
  @Post('purchase/:idProduct')
  registerquantity(
    @Param('idProduct') idProduct: string,
    @Body() product: RegisterquantityDTO,
  ): Observable<ProductTypeOrmEntity> {
    this.useCase.registerquantity();
    return this.useCase.execute(product, idProduct);
  }
  @Get(':id')
  findById(@Param('id') id: string): Observable<ProductTypeOrmEntity> {
    return this.productService.findByID(id);
  }
}

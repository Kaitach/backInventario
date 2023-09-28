import { CommandBus } from '@nestjs/cqrs';
/* eslint-disable prettier/prettier */

import { Controller, Post, Body, Param, Get } from "@nestjs/common";
import { Observable } from "rxjs";
import { productServiceBD } from "..";
import { productDelegate } from "../../application/delegate/productDelegate";
import { ProductTypeOrmEntity, branchServiceBD } from "../database";
import { RegisterProductInventoryStockDTO } from "../utils/dto/product/registerProductInventory";
import { RegisterProductDTO } from "../utils/dto/product/registerProductRegister";
import { RegisterSaleDTO } from "../utils/dto/product/registerSale";

@Controller('product')
export class ProductController {
    private readonly useCase: productDelegate;

    constructor(
      private readonly productService: productServiceBD, private readonly commandBus:  CommandBus    , private readonly brancService: branchServiceBD, 

  
    ) {
      this.useCase = new productDelegate(this.productService,this.commandBus ,this.brancService); 
    }
  
    @Post()
    registerProduct(@Body() product: RegisterProductDTO): Observable<ProductTypeOrmEntity> {
      this.useCase.registerProduct();
      return this.useCase.execute(product);
    }
    @Post('sale')
    registerCustomerSale(@Body() product: RegisterSaleDTO): Observable<ProductTypeOrmEntity> {
      this.useCase.registerCustomerSale();
      return this.useCase.execute(product);
    }
    @Post('reseller')
    registerResellerSale(@Body() product: RegisterSaleDTO): Observable<ProductTypeOrmEntity> {
      this.useCase.registerResellerSale();
      return this.useCase.execute(product);
    }
    @Post('addInventory')
    registerProductInventoryStock(@Body() product: RegisterProductInventoryStockDTO): Observable<ProductTypeOrmEntity> {
      this.useCase.registerProductInventoryStock();
      return this.useCase.execute(product);
    }
    @Get(':id')
    findById(@Param('id') id: string): Observable<ProductTypeOrmEntity> {
      return this.productService.findByID(id);
    }
    
}

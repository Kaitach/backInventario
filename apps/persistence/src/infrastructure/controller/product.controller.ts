
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RegisterProductDTO, RegisterquantityDTO, productServiceBD } from '..';
import { ProductTypeOrmEntity, branchServiceBD } from '../database';
import { RegisterSaleDTO } from '../utils/dto/product/registerSale';
import { EventPattern, Payload } from '@nestjs/microservices';
import { productDelegate } from '../..';

@Controller('api/v1/product')
export class ProductController {
  private readonly useCase: productDelegate;

  constructor(
    private readonly productService: productServiceBD,
    private readonly brancService: branchServiceBD
  ) {
    this.useCase = new productDelegate(
      this.productService,
      this.brancService,
    );
  }
  @Post('register')
  registerProduct(
    @Payload () product: RegisterProductDTO,
  ): Observable<ProductTypeOrmEntity> {
    console.log('registerProduct', product)
   
    this.useCase.registerProduct();
    return this.useCase.execute(product);
  }
  
  
  @Post('customer-sale/:idProduct')
  registerCustomerSale(
    @Body() product: RegisterSaleDTO,
  ): Observable<ProductTypeOrmEntity> {
    console.log(product)
    this.useCase.registerCustomerSale();
    return this.useCase.execute(product, product.productId)
  }
  @Post('seller-sale/:idProduct')
  registerResellerSale(
  
    @Body() product: RegisterSaleDTO,
  ): Observable<ProductTypeOrmEntity> {
    this.useCase.registerResellerSale();
    return this.useCase.execute(product, product.productId);
  }
  @Post('purchase/:idProduct')
  registerquantity(   
    @Body() product: RegisterquantityDTO,
  ): Observable<ProductTypeOrmEntity> {
    console.log(product)
    console.log('arriba crack')

    this.useCase.registerquantity();
    return this.useCase.execute(product, product.productId);
  }
  @Get(':id')
  findById(@Param('id') id: string): Observable<ProductTypeOrmEntity> {
    return this.productService.findByID(id);
  }


  @Get()
  getAll(): Observable<ProductTypeOrmEntity[]> {
    return this.productService.getall();
  }
}

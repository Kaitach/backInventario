/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */

import { Body, Controller,   Param, Post, UseFilters, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { productDelegate } from '../../application/delegate/productDelegate';
import { infrastructureServiceProduct } from '../service/infrastructure.service';
import { RegisterquantityDTO } from '../utils/dto/product/registerProductInventory';
import { RegisterProductDTO } from '../utils/dto/product/registerProductRegister';
import { RegisterSaleDTO } from '../utils/dto/product/registerSale';
import { MessagingService } from '../events/service/serviceEvent';
import { ErrorExceptionFilter } from '../utils/exception-filters/error.exception-filter';
import { AuthGuard } from '../utils/guards/auth.guard';
import { AdminGuard } from '../utils/guards/admin.Guard';
import { SaleEntity, IProductEntity } from '../../../../shared';
@Controller('api/v1/product')
@UseFilters(ErrorExceptionFilter)

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
  @UseGuards(AuthGuard,AdminGuard )

  registerProduct(
    @Body() product: RegisterProductDTO,
  ): Observable<void> {
    this.useCase.registerProduct();
    return this.useCase.execute(product);
  }
  @Post('customer-sale/:idProduct')
  
  registerCustomerSale(
    @Param('idProduct') branchID: string,

        @Body() product: RegisterSaleDTO[],
  ): Observable<void> {
    this.useCase.registerCustomerSale();
    return this.useCase.execute(product, branchID);
    
  }
  @Post('seller-sale/:idProduct')
  @UseGuards(AuthGuard,AdminGuard )
  registerResellerSale(
    @Param('idProduct') branchID: string,
    @Body() product: RegisterSaleDTO,
  ): Observable<void> {
 

    this.useCase.registerResellerSale();
    return this.useCase.execute(product, branchID);
  }
  @Post('purchase/:idProduct')
  @UseGuards(AuthGuard,AdminGuard )

  registerquantity(
    @Param('idProduct') idProduct: string,
    @Body() product: RegisterquantityDTO,
  ): Observable<void> {
    this.useCase.registerquantity();
    return this.useCase.execute(product, idProduct);
  }






  @Post('returnSale')
  @UseGuards(AuthGuard, AdminGuard)
  returnSale(
    @Body() requestBody: { branchID: string, idSale: SaleEntity,product: IProductEntity,  }
  ): Observable<void> {


    this.useCase.returnquantityUseCase();
    return this.useCase.execute(requestBody);
  }
  
}

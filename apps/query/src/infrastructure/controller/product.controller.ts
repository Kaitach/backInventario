import { Controller,  Get, Param } from "@nestjs/common";
import { Observable } from "rxjs";
import { productServiceBD, branchServiceBD, ProductTypeOrmEntity } from "../database";
import { productDelegate } from "../../../";



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

 
  @Get(':id')
  findById(@Param('id') id: string): Observable<ProductTypeOrmEntity> {
    this.useCase.getProductByID()
    return this.useCase.execute(id)
  }


  @Get()
  getAll(): Observable<ProductTypeOrmEntity[]> {
    return this.productService.getall();
  }
}

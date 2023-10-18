/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { ProductTypeOrmEntity } from '../entities';
import { ProductRepository } from '../repositories';
import { ProductDomainService } from '../../../../';
import { RegisterProductDTO , RegisterSaleDTO, RegisterquantityDTO, } from '../../../../';

@Injectable()
export class productServiceBD
  implements ProductDomainService<ProductTypeOrmEntity>
{
  constructor(private readonly productRepository: ProductRepository) {}
  findByID(id: string): Observable<ProductTypeOrmEntity> {

    return this.productRepository.findByID(id);
  }

  registerProduct(data: RegisterProductDTO): Observable<ProductTypeOrmEntity> {
    return this.productRepository.registerProduct(data);
  }
  registerquantity(
    data: RegisterquantityDTO,
  ): Observable<ProductTypeOrmEntity> {
    return this.productRepository.registerquantity(data);
  }
  registerCustomerSale(
    data: RegisterSaleDTO,
  ): Observable<ProductTypeOrmEntity> {
    return this.productRepository.registerCustomerSale(data);
  }
  registerResellerSale(
    data: RegisterSaleDTO,
  ): Observable<ProductTypeOrmEntity> {
    return this.productRepository.registerResellerSale(data);
  }

  getall(
   
  ): Observable<ProductTypeOrmEntity[]> {
    return this.productRepository.getAllProducts();
  }
}

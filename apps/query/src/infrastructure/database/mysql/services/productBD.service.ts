/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { ProductTypeOrmEntity } from '../entities';
import { ProductRepository } from '../repositories';
import { RegisterProductDTO , RegisterSaleDTO, RegisterquantityDTO, } from '../../../../';
import { ProductDomainService } from '../../../../../../shared';

@Injectable()
export class productServiceBD
  implements ProductDomainService<ProductTypeOrmEntity>
{
  constructor(private readonly productRepository: ProductRepository) {}
  returnquantity(data: ProductTypeOrmEntity): Observable<ProductTypeOrmEntity> {
    console.log(data)
    return this.productRepository.returnquantity(data);
  }
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

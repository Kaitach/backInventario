/* eslint-disable prettier/prettier */
import { RegisterSaleDTO } from './../../../utils/dto/product/registerSale';
import { RegisterProductInventoryStockDTO } from './../../../utils/dto/product/registerProductInventory';
import { RegisterProductDTO } from './../../../utils/dto/product/registerProductRegister';
import { Injectable } from '@nestjs/common';

import { ProductDomainService } from 'apps/back-inventario/src/domain/services/productServiceDomain';
import { ProductTypeOrmEntity } from '../entities';
import { ProductRepository } from '../repositories';
import { Observable } from 'rxjs';


@Injectable()
export class productServiceBD implements ProductDomainService<ProductTypeOrmEntity>{
  constructor(private readonly productRepository: ProductRepository) {}
  findByID(id: string): Observable<ProductTypeOrmEntity> {
    return this.productRepository.findByID(id) 
  }

  registerProduct(data: RegisterProductDTO): Observable<ProductTypeOrmEntity> {
    return this.productRepository.registerProduct(data)
  }
  registerProductInventoryStock(data: RegisterProductInventoryStockDTO): Observable<ProductTypeOrmEntity> {
    return this.productRepository.registerProductInventoryStock(data)  }
  registerCustomerSale(data: RegisterSaleDTO): Observable<ProductTypeOrmEntity> {
    return this.productRepository.registerCustomerSale(data)  }
  registerResellerSale(data: RegisterSaleDTO): Observable<ProductTypeOrmEntity> {
    return this.productRepository.registerResellerSale(data)  }
}



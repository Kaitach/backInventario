/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, catchError, from, throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { ProductDomainService } from '../../../../../../back-inventario/src/domain/services/productServiceDomain';
import { RegisterSaleDTO } from '../../../utils/dto/product/registerSale';
import { ProductTypeOrmEntity } from '../entities/productDBEntity';
import { RegisterquantityDTO } from './../../../utils/dto/product/registerProductInventory';
import { RegisterProductDTO } from './../../../utils/dto/product/registerProductRegister';

@Injectable()
export class ProductRepository
  implements ProductDomainService<ProductTypeOrmEntity>
{
  constructor(
    @InjectRepository(ProductTypeOrmEntity)
    private readonly productRepository: Repository<ProductTypeOrmEntity>,
  ) {}
  findByID(id: string): Observable<ProductTypeOrmEntity> {
    return from(
      this.productRepository
        .createQueryBuilder('product')
        .select(['product.productId', 'product.name', 'product.description', 'product.price', 'product.quantity', 'product.category', 'product.branchId']) 
        .where('product.productId = :id', { id })
        .getOne(),
    ).pipe(
      catchError((error) =>
        throwError(`Error al obtener la task por ID: ${error.message}`),
      ),
    );
  }
  registerProduct(data: RegisterProductDTO): Observable<ProductTypeOrmEntity> {
    return from(this.productRepository.save(data)).pipe(
      catchError((error) =>
        throwError(`Error al crear usuario: ${error.message}`),
      ),
    );
  }
  registerquantity(
    data: RegisterquantityDTO,
  ): Observable<ProductTypeOrmEntity> {
    return from(this.productRepository.save(data));
  }

  registerCustomerSale(
    data: RegisterSaleDTO,
  ): Observable<ProductTypeOrmEntity> {
    return from(this.productRepository.save(data));
  }
  registerResellerSale(
    data: RegisterSaleDTO,
  ): Observable<ProductTypeOrmEntity> {
    return from(this.productRepository.save(data));
  }

  getAllProducts(): Observable<ProductTypeOrmEntity[]> {
    return from(
      this.productRepository
        .createQueryBuilder('product')
        .select([
          'product.productId',
          'product.name',
          'product.description',
          'product.price',
          'product.quantity',
          'product.category',
          'product.branchId',
        ])
        .getMany(),
    ).pipe(
      catchError((error) =>
        throwError(`Error al obtener todos los productos: ${error.message}`),
      ),
    );
  }
}

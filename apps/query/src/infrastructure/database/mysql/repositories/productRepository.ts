import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, from, throwError, of } from 'rxjs';
import { catchError,  switchMap } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm/error/QueryFailedError';
import {ProductDomainService} from '../../../../../../shared';
import { RegisterProductDTO } from '../../../../';
import { RegisterSaleDTO, RegisterquantityDTO } from '../../../../';
import { ProductTypeOrmEntity } from '../entities/productDBEntity';

@Injectable()
export class ProductRepository implements ProductDomainService<ProductTypeOrmEntity> {
  constructor(
    @InjectRepository(ProductTypeOrmEntity)
    private readonly productRepository: Repository<ProductTypeOrmEntity>,
  ) {}
  returnquantity(data: ProductTypeOrmEntity): Observable<ProductTypeOrmEntity> {
    try {
      console.log(data);
      return from(this.productRepository.save(data)).pipe(
        catchError((error) => {
          if (error instanceof QueryFailedError && error.message.includes('ER_NO_REFERENCED_ROW_2')) {
            console.error('Error de  de clave externa: No se encontró la fila referenciada.');
            return of(undefined); 
          } else {
            console.error(`Error al obtener el producto por ID: ${error.message}`);
            return throwError(error);
          }
        })
      );
    } catch (error) {
      console.error(`Error en el bloque try-catch: ${error.message}`);
      return throwError(error);
    }  }

  findByID(id: string): Observable<ProductTypeOrmEntity | undefined> {
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
        .where('product.productId = :id', { id })
        .getOne(),
    ).pipe(
      catchError((error) => {
        if (error instanceof QueryFailedError && error.message.includes('ER_NO_REFERENCED_ROW_2')) {
          console.error('Error de restricción de clave externa: No se encontró la fila referenciada.');
          return of(undefined); 
        } else {
          console.error(`Error al obtener el producto por ID: ${error.message}`);
          return throwError(error);
        }
      }),
    );
  }

  registerProduct(data: RegisterProductDTO): Observable<ProductTypeOrmEntity> {
    try {
      return from(this.productRepository.save(data));
    } catch (error) {
      catchError((error) => {
        if (error instanceof QueryFailedError && error.message.includes('ER_NO_REFERENCED_ROW_2')) {
          console.error('Error de restricción de clave externa: No se encontró la fila referenciada.');
          return of(undefined); 
        } else {
          console.error(`Error al obtener el producto por ID: ${error.message}`);
          return throwError(error);
        }
      })
    }
}

  registerquantity(
    data: RegisterquantityDTO,
  ): Observable<ProductTypeOrmEntity> {
    try {
      console.log(data);
      return from(this.productRepository.save(data)).pipe(
        catchError((error) => {
          if (error instanceof QueryFailedError && error.message.includes('ER_NO_REFERENCED_ROW_2')) {
            console.error('Error de  de clave externa: No se encontró la fila referenciada.');
            return of(undefined); 
          } else {
            console.error(`Error al obtener el producto por ID: ${error.message}`);
            return throwError(error);
          }
        })
      );
    } catch (error) {
      console.error(`Error en el bloque try-catch: ${error.message}`);
      return throwError(error);
    }

  }
  registerCustomerSale(
    data: RegisterSaleDTO,
  ): Observable<ProductTypeOrmEntity> {
    const productId = data.productId;
    const quantity = data.quantity;
    try {
     
      return from(this.findByID(productId)).pipe(
        catchError((error) => {
          console.error(`Error al buscar el producto: ${error.message}`);
          return throwError(`Error al buscar el producto: ${error.message}`);
        }),
   
        switchMap((product) => {
          if (!product) {
            throw new Error('Producto no encontrado');
          }

          product.quantity = quantity;

          return from(this.productRepository.save(product));
        }),
      );
    } catch (error) {
      console.error(`Error al registrar la venta al revendedor: ${error.message}`);
      return throwError(`Error al registrar la venta al revendedor: ${error.message}`);
    }
  }

  registerResellerSale(data: RegisterSaleDTO): Observable<ProductTypeOrmEntity> {
    const productId = data.productId;
    const quantity = data.quantity;

    try {
      return from(this.findByID(productId)).pipe(
        catchError((error) => {
          console.error(`Error al buscar el producto: ${error.message}`);
          return throwError(`Error al buscar el producto: ${error.message}`);
        }),
       
        switchMap((product) => {
          if (!product) {
            throw new Error('Producto no encontrado');
          }

          product.quantity = quantity;

          return from(this.productRepository.save(product));
        }),
      );
    } catch (error) {
      console.error(`Error al registrar la venta al revendedor: ${error.message}`);
      return throwError(`Error al registrar la venta al revendedor: ${error.message}`);
    }
  }


  getAllProducts(): Observable<ProductTypeOrmEntity[]> {
    try {
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
      );
    } catch (error) {
      console.error(`Error al obtener todos los productos: ${error.message}`);
      return throwError(`Error al obtener todos los productos: ${error.message}`);
    }
  }
}

/* eslint-disable prettier/prettier */
import { Injectable, } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Observable, catchError, from,   throwError,  } from "rxjs";
import { ProductTypeOrmEntity } from '../entities/productDBEntity';
import { RegisterProductInventoryStockDTO } from './../../../utils/dto/product/registerProductInventory';
import { RegisterProductDTO } from './../../../utils/dto/product/registerProductRegister';
import { ProductDomainService } from "../../../../../../back-inventario/src/domain/services/productServiceDomain";
import { RegisterSaleDTO } from '../../../utils/dto/product/registerSale';

@Injectable()
export class ProductRepository implements ProductDomainService<ProductTypeOrmEntity> {
  constructor(
    @InjectRepository(ProductTypeOrmEntity)
    private readonly productRepository: Repository<ProductTypeOrmEntity>,
  ) {}
  findByID(id: string): Observable<ProductTypeOrmEntity> {
    return from(
      this.productRepository
        .createQueryBuilder("product")
        .where("product.productId = :id", { id }) 
        .getOne()
    ).pipe(
      catchError((error) => throwError(`Error al obtener la task por ID: ${error.message}`))
    );
  }
  registerProduct(data: RegisterProductDTO): Observable<ProductTypeOrmEntity> {
    return from(this.productRepository.save(data)).pipe(
      catchError((error) => throwError(`Error al crear usuario: ${error.message}`)),
    );  
  }
  registerProductInventoryStock(data: RegisterProductInventoryStockDTO): Observable<ProductTypeOrmEntity> {
    return from(this.productRepository.save(data)); 

    
  }

  registerCustomerSale(data: RegisterSaleDTO): Observable<ProductTypeOrmEntity> {
    return from(this.productRepository.save(data)); 

  }
  registerResellerSale(data: RegisterSaleDTO): Observable<ProductTypeOrmEntity> {

        return from(this.productRepository.save(data)); 
    
  }


  

}
 

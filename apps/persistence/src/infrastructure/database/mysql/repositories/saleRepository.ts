import { ISale } from "apps/persistence/src/domain/interfaces/sale.interface";
import { ISaleServiceDomain } from "apps/persistence/src/domain/services/sale.interface.serviceSomain";
import { Observable, from } from "rxjs";
import { Repository } from "typeorm";
import { SaleTypeOrmEntity } from "../entities/salesDBEntity";
import { InjectRepository } from "@nestjs/typeorm";

export class SaleTypeOrmRepository implements ISaleServiceDomain {
    constructor(
      @InjectRepository(SaleTypeOrmEntity)
      private readonly saleRepository: Repository<SaleTypeOrmEntity>,
    ) {}
   
  
    saveSales(sales: ISale): Observable<ISale> {
      return from(this.saleRepository.save(sales));
    }


}
import { Observable, from } from "rxjs";
import { Repository } from "typeorm";
import { SaleTypeOrmEntity } from "../entities/salesDBEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { ISaleServiceDomain, ISale } from "../../../../../../shared";


export class SaleTypeOrmRepository implements ISaleServiceDomain {
    constructor(
      @InjectRepository(SaleTypeOrmEntity)
      private readonly saleRepository: Repository<SaleTypeOrmEntity>,
    ) {}
   
  
    saveSales(sales: ISale): Observable<ISale> {
      return from(this.saleRepository.save(sales));
    }


}
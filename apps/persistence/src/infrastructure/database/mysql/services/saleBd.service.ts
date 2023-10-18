import { Observable } from 'rxjs';
import { Injectable } from "@nestjs/common";
import { ISaleServiceDomain } from "../../../../domain/services/sale.interface.serviceSomain";
import { SaleTypeOrmRepository } from "../repositories/saleRepository";
import { SaleTypeOrmEntity } from '../entities/salesDBEntity';
import { ISale } from '../../../../domain/interfaces/sale.interface';

@Injectable()
export class SaleServiceBD implements ISaleServiceDomain{
    constructor(private readonly saleRepository: SaleTypeOrmRepository) {}

    saveSales(sales: ISale):Observable<SaleTypeOrmEntity> {
        return this.saleRepository.saveSales(sales)
    }

}
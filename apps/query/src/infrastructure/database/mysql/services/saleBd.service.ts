import { Injectable } from "@nestjs/common";
import { SaleTypeOrmRepository } from "../repositories/saleRepository";
import { ISale, ISaleServiceDomain } from '../../../../../../shared';

@Injectable()
export class SaleServiceBD implements ISaleServiceDomain{
    constructor(private readonly saleRepository: SaleTypeOrmRepository) {}

    saveSales(sales: ISale):any {
        return this.saleRepository.saveSales(sales)
    }

}
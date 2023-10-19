import { Observable } from 'rxjs';
import { ISale } from '../interfaces/sale.interface';

export interface ISaleServiceDomain {
  saveSales(sales: ISale): Observable<ISale>;
}

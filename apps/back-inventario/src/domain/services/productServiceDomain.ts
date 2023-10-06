/* eslint-disable prettier/prettier */
import { Observable } from 'rxjs/internal/Observable';
import { ISale } from '../interfaces/sale.interface';

export interface ProductDomainService<T> {
  registerProduct(data: T): Observable<T>;
  registerquantity(data: T): Observable<T>;
  registerCustomerSale(data: ISale): Observable<ISale>;
  registerResellerSale(data: ISale): Observable<T>;
  findByID(id: string): Observable<T >;
}

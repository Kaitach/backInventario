/* eslint-disable prettier/prettier */
import { Observable } from 'rxjs/internal/Observable';

export interface ProductDomainService<T> {
  registerProduct(data: T): Observable<T>;
  registerquantity(data: T): Observable<T>;
  registerCustomerSale?(data:  T): Observable<T>;
  registerResellerSale?(data: T): Observable<T>;
  findByID?(id: string): Observable<T >;
  returnquantity?(data: T): Observable<T>;
  returnResellerSale?(data: T): Observable<T>;
  returnCustomerSale?(data:  T): Observable<T>;

}

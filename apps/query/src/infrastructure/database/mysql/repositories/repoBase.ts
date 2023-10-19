/* eslint-disable prettier/prettier */
import { Observable } from 'rxjs';

export interface IRepositoriBase<Entity> {
  findById(id: string): Observable<Entity>;
  create(entity: Entity): Observable<Entity>;
  update(id: string, entity: Entity): Observable<Entity>;
  delete(id: string): Observable<boolean>;
  

}

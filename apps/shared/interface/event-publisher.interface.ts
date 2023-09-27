/* eslint-disable prettier/prettier */
import { Observable } from "rxjs";

export interface IEventPublisher {
   sendObservable<Result = any, Input = any>(
    pattern: any,
    data: Input
  ): Observable<Result>;
  emitObservable<Result = any, Input = any>(
    pattern: any,
    data: Input
  ): Observable<Result>;
}

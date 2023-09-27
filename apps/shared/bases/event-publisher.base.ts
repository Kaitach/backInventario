/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { IEventPublisher } from "../interface";
import { Observable, Subject, } from "rxjs";

export abstract class EventPublisherBase<Response> implements IEventPublisher {
  private responseSubject = new Subject<Response | Response[] | null>();

  constructor(private readonly eventPublisher: IEventPublisher) {}
  sendObservable<Result = any, Input = any>(pattern: any, data: Input): Observable<Result> {
    const observable = new Observable<Result>((observer) => {
      this.eventPublisher.sendObservable(pattern, data).subscribe((result) => {
        observer.next(result);
        observer.complete();
      });
    });

    return observable  }
    emitObservable<Result = any, Input = Response>(
      pattern: any,
      data: Input
    ): Observable<Result> {
      return new Observable<Result>((observer) => {
        this.eventPublisher.emitObservable(pattern, data).subscribe({
          next: (result) => {
            observer.next(result);
          },
          error: (error) => {
            observer.error(error);
          },
          complete: () => {
            observer.complete();
          },
        });
      });
    }
    

  get responses(): Observable<Response | Response[] | null> {
    return this.responseSubject.asObservable();
  }



  abstract publish<Result = any>(): Observable<Result>;
}


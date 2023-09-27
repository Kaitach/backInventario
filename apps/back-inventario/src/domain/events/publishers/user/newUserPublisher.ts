/* eslint-disable prettier/prettier */
import { EventPublisherBase } from "apps/shared";
import { IBranchEntiy } from "../../../entities";
import { Observable } from 'rxjs';

export class NewBranchCreatedPublisher <
Response = IBranchEntiy
>   extends EventPublisherBase<Response> {
    publish<Result = any>(): Observable<Result> {
        return this.emitObservable(
            'New-User-Created-successfull',
            JSON.stringify({ data: this.responses })
        )
} }
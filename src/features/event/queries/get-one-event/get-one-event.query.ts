import { Query } from '@nestjs/cqrs';
import { GetOneEventResponse } from './get-one-event.response';

export class GetOneEventQuery extends Query<GetOneEventResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

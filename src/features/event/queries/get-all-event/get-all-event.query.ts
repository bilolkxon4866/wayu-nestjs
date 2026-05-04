import { Query } from '@nestjs/cqrs';
import { GetAllEventFilters } from './get-all-event.filters';
import { GetAllEventResponse } from './get-all-event.response';

export class GetAllEventQuery extends Query<GetAllEventResponse[]> {
    constructor(public readonly filters: GetAllEventFilters) {
        super();
    }
}

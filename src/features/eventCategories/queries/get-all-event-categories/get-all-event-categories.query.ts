import { Query } from '@nestjs/cqrs';
import { GetAllEventCategoriesFilters } from './get-all-event-categories.filters';
import { GetAllEventCategoriesResponse } from './get-all-event-categories.response';

export class GetAllEventCategoriesQuery extends Query<GetAllEventCategoriesResponse[]> {
    constructor(public readonly filters: GetAllEventCategoriesFilters) {
        super();
    }
}

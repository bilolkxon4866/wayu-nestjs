import { Query } from '@nestjs/cqrs';
import { GetAllFaqsFilters } from './get-all-faqs.filters';
import { GetAllFaqsResponse } from './get-all-faqs.response';

export class GetAllFaqsQuery extends Query<GetAllFaqsResponse[]> {
    constructor(public readonly filters: GetAllFaqsFilters) {
        super();
    }
}

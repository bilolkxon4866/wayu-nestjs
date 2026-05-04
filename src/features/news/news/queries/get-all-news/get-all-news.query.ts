import { Query } from '@nestjs/cqrs';
import { GetAllNewsFilters } from './get-all-news.filters';
import { GetAllNewsResponse } from './get-all-news.response';

export class GetAllNewsQuery extends Query<GetAllNewsResponse[]> {
    constructor(public readonly filters: GetAllNewsFilters) {
        super();
    }
}

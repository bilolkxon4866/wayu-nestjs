import { Query } from '@nestjs/cqrs';
import { GetAllNewsCategoriesFilters } from './get-all-news-categories.filters';
import { GetAllNewsCategoriesResponse } from './get-all-news-categories.response';

export class GetAllNewsCategoriesQuery extends Query<GetAllNewsCategoriesResponse[]> {
    constructor(public readonly filters: GetAllNewsCategoriesFilters) {
        super();
    }
}

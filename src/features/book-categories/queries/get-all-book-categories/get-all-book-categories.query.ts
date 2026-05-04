import { Query } from '@nestjs/cqrs';
import { GetAllBookCategoriesFilters } from './get-all-book-categories.filters';
import { GetAllBookCategoriesResponse } from './get-all-book-categories.response';

export class GetAllBookCategoriesQuery extends Query<GetAllBookCategoriesResponse[]> {
    constructor(public readonly filters: GetAllBookCategoriesFilters) {
        super();
    }
}

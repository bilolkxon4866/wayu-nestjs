import { Query } from '@nestjs/cqrs';
import { GetAllBooksFilters } from './get-all-books.filters';
import { GetAllBooksResponse } from './get-all-books.response';

export class GetAllBooksQuery extends Query<GetAllBooksResponse[]> {
    constructor(public readonly filters: GetAllBooksFilters) {
        super();
    }
}

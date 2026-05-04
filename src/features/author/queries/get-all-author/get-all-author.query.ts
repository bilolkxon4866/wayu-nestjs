import { Query } from '@nestjs/cqrs';
import { GetAllAuthorFilters } from './get-all-author.filters';
import { GetAllAuthorResponse } from './get-all-author.response';

export class GetAllAuthorQuery extends Query<GetAllAuthorResponse[]> {
    constructor(public readonly filters: GetAllAuthorFilters) {
        super();
    }
}

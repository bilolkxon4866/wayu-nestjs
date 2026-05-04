import { Query } from '@nestjs/cqrs';
import { GetAllTagsFilters } from './get-all-tags.filters';
import { GetAllTagsResponse } from './get-all-tags.response';

export class GetAllTagsQuery extends Query<GetAllTagsResponse[]> {
    constructor(public readonly filters: GetAllTagsFilters) {
        super();
    }
}

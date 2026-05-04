import { Query } from '@nestjs/cqrs';
import { GetAllInstagramPostsFilters } from './get-all-instagram-posts.filters';
import { GetAllInstagramPostsResponse } from './get-all-instagram-posts.response';

export class GetAllInstagramPostsQuery extends Query<GetAllInstagramPostsResponse[]> {
    constructor(public readonly filters: GetAllInstagramPostsFilters) {
        super();
    }
}

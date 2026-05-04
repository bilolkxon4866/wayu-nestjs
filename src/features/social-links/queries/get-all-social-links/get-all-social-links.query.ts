import { Query } from '@nestjs/cqrs';
import { GetAllSocialLinksFilters } from './get-all-social-links.filters';
import { GetAllSocialLinksResponse } from './get-all-social-links.response';

export class GetAllSocialLinksQuery extends Query<GetAllSocialLinksResponse[]> {
    constructor(public readonly filters: GetAllSocialLinksFilters) {
        super();
    }
}

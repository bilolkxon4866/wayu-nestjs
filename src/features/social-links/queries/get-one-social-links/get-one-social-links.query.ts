import { Query } from '@nestjs/cqrs';
import { GetOneSocialLinksResponse } from './get-one-social-links.response';

export class GetOneSocialLinksQuery extends Query<GetOneSocialLinksResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

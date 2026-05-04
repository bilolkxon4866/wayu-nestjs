import { Query } from '@nestjs/cqrs';
import { GetNewsByIdResponse } from './get-news-by-id.response';

export class GetNewsByIdQuery extends Query<GetNewsByIdResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

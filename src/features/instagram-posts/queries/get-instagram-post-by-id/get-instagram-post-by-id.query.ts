import { Query } from '@nestjs/cqrs';
import { GetInstagramPostByIdResponse } from './get-instagram-post-by-id.response';

export class GetInstagramPostByIdQuery extends Query<GetInstagramPostByIdResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

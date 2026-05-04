import { Query } from '@nestjs/cqrs';
import { GetTagByIdResponse } from './get-tag-by-id.response';

export class GetTagByIdQuery extends Query<GetTagByIdResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

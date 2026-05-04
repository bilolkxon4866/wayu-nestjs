import { Query } from '@nestjs/cqrs';
import { GetOneAuthorResponse } from './get-one-author.response';

export class GetOneAuthorQuery extends Query<GetOneAuthorResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

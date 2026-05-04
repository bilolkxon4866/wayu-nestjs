import { Query } from '@nestjs/cqrs';
import { GetOneBookResponse } from './get-one-book.response';

export class GetOneBookQuery extends Query<GetOneBookResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

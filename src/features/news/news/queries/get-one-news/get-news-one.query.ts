import { Query } from '@nestjs/cqrs';
import { GetNewsOneResponse } from './get-news-one.response';

export class GetNewsOneQuery extends Query<GetNewsOneResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

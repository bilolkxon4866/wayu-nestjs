import { Query } from '@nestjs/cqrs';
import { GetFaqByIdResponse } from './get-faq-by-id.response';

export class GetFaqByIdQuery extends Query<GetFaqByIdResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

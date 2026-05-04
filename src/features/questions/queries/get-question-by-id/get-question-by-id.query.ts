import { Query } from '@nestjs/cqrs';
import { GetQuestionByIdResponse } from './get-question-by-id.response';

export class GetQuestionByIdQuery extends Query<GetQuestionByIdResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

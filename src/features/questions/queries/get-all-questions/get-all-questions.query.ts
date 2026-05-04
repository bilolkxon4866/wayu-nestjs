import { Query } from '@nestjs/cqrs';
import { GetAllQuestionsFilters } from './get-all-questions.filters';
import { GetAllQuestionsResponse } from './get-all-questions.response';

export class GetAllQuestionsQuery extends Query<GetAllQuestionsResponse[]> {
    constructor(public readonly filters: GetAllQuestionsFilters) {
        super();
    }
}

import { Query } from '@nestjs/cqrs';
import { GetOneVacanciesResponse } from './get-one-vacancies.response';

export class GetOneVacanciesQuery extends Query<GetOneVacanciesResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

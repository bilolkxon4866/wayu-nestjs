import { Query } from '@nestjs/cqrs';
import { GetAllVacanciesFilters } from './get-all-vacancies.filters';
import { GetAllVacanciesResponse } from './get-all-vacancies.response';

export class GetAllVacanciesQuery extends Query<GetAllVacanciesResponse[]> {
    constructor(public readonly filters: GetAllVacanciesFilters) {
        super();
    }
}

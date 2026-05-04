import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllVacanciesQuery } from './get-all-vacancies.query';
import { GetAllVacanciesResponse } from './get-all-vacancies.response';
import { VacanciesEntity } from '../../vacancies.entity';

@QueryHandler(GetAllVacanciesQuery)
export class GetAllVacanciesHandler implements IQueryHandler<GetAllVacanciesQuery> {
    async execute(query: GetAllVacanciesQuery): Promise<GetAllVacanciesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const items = await VacanciesEntity.find({ skip, take });
        return items.map(item => plainToInstance(GetAllVacanciesResponse, item, { excludeExtraneousValues: true }));
    }
}

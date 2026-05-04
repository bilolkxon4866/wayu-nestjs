import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneVacanciesQuery } from './get-one-vacancies.query';
import { GetOneVacanciesResponse } from './get-one-vacancies.response';
import { VacanciesEntity } from '../../vacancies.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOneVacanciesQuery)
export class GetOneVacanciesHandler implements IQueryHandler<GetOneVacanciesQuery> {
    async execute(query: GetOneVacanciesQuery): Promise<GetOneVacanciesResponse> {
        const item = await VacanciesEntity.findOneBy({ id: query.id });
        if (!item) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }

        return plainToInstance(GetOneVacanciesResponse, item, { excludeExtraneousValues: true });
    }
}

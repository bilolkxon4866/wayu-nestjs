import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllCountriesQuery } from './get-all-countries.query';
import { GetAllCountriesResponse } from './get-all-countries.response';
import { CountriesEntity } from '../../countries.entity';

@QueryHandler(GetAllCountriesQuery)
export class GetAllCountriesHandler implements IQueryHandler<GetAllCountriesQuery> {
    async execute(query: GetAllCountriesQuery): Promise<GetAllCountriesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const countries = await CountriesEntity.find({ skip, take });
        return plainToInstance(GetAllCountriesResponse, countries, { excludeExtraneousValues: true });
    }
}

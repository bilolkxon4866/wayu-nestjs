import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneCountriesQuery } from './get-one-countries.query';
import { GetOneCountriesResponse } from './get-one-countries.response';
import { CountriesEntity } from '../../countries.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOneCountriesQuery)
export class GetOneCountriesHandler implements IQueryHandler<GetOneCountriesQuery> {
    async execute(query: GetOneCountriesQuery): Promise<GetOneCountriesResponse> {
        const country = await CountriesEntity.findOneBy({ id: query.id });
        if (!country) {
            throw new NotFoundException('Berilgan id bo\'yicha davlat topilmadi');
        }

        return plainToInstance(GetOneCountriesResponse, country, { excludeExtraneousValues: true });
    }
}

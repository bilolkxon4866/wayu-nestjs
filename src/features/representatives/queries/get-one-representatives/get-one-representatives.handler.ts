import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneRepresentativesQuery } from './get-one-representatives.query';
import { GetOneRepresentativesResponse } from './get-one-representatives.response';
import { RepresentativesEntity } from '../../representatives.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOneRepresentativesQuery)
export class GetOneRepresentativesHandler implements IQueryHandler<GetOneRepresentativesQuery> {
    async execute(query: GetOneRepresentativesQuery): Promise<GetOneRepresentativesResponse> {
        const item = await RepresentativesEntity.findOneBy({ id: query.id });
        if (!item) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }

        return plainToInstance(GetOneRepresentativesResponse, item, { excludeExtraneousValues: true });
    }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllRepresentativesQuery } from './get-all-representatives.query';
import { GetAllRepresentativesResponse } from './get-all-representatives.response';
import { RepresentativesEntity } from '../../representatives.entity';

@QueryHandler(GetAllRepresentativesQuery)
export class GetAllRepresentativesHandler implements IQueryHandler<GetAllRepresentativesQuery> {
    async execute(query: GetAllRepresentativesQuery): Promise<GetAllRepresentativesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const items = await RepresentativesEntity.find({ skip, take });
        return items.map(item => plainToInstance(GetAllRepresentativesResponse, item, { excludeExtraneousValues: true }));
    }
}

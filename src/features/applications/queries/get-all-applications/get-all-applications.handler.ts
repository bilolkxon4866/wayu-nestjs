import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllApplicationsQuery } from './get-all-applications.query';
import { GetAllApplicationsResponse } from './get-all-applications.response';
import { ApplicationsEntity } from '../../applications.entity';

@QueryHandler(GetAllApplicationsQuery)
export class GetAllApplicationsHandler implements IQueryHandler<GetAllApplicationsQuery> {
    async execute(query: GetAllApplicationsQuery): Promise<GetAllApplicationsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const items = await ApplicationsEntity.find({ skip, take });
        return items.map(item => plainToInstance(GetAllApplicationsResponse, item, { excludeExtraneousValues: true }));
    }
}

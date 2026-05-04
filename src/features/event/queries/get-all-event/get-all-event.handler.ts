import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllEventQuery } from './get-all-event.query';
import { GetAllEventResponse } from './get-all-event.response';
import { EventEntity } from '../../event.entity';

@QueryHandler(GetAllEventQuery)
export class GetAllEventHandler implements IQueryHandler<GetAllEventQuery> {
    async execute(query: GetAllEventQuery): Promise<GetAllEventResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const items = await EventEntity.find({ skip, take });
        return items.map(item => plainToInstance(GetAllEventResponse, item, { excludeExtraneousValues: true }));
    }
}

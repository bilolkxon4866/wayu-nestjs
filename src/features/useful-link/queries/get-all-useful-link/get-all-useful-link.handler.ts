import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllUsefulLinkQuery } from './get-all-useful-link.query';
import { GetAllUsefulLinkResponse } from './get-all-useful-link.response';
import { UsefulLinkEntity } from '../../usefulLink.entity';

@QueryHandler(GetAllUsefulLinkQuery)
export class GetAllUsefulLinkHandler implements IQueryHandler<GetAllUsefulLinkQuery> {
    async execute(query: GetAllUsefulLinkQuery): Promise<GetAllUsefulLinkResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const items = await UsefulLinkEntity.find({ skip, take });
        return items.map(item => plainToInstance(GetAllUsefulLinkResponse, item, { excludeExtraneousValues: true }));
    }
}

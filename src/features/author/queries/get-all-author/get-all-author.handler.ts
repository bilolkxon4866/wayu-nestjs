import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllAuthorQuery } from './get-all-author.query';
import { GetAllAuthorResponse } from './get-all-author.response';
import { AuthorEntity } from '../../author.entity';

@QueryHandler(GetAllAuthorQuery)
export class GetAllAuthorHandler implements IQueryHandler<GetAllAuthorQuery> {
    async execute(query: GetAllAuthorQuery): Promise<GetAllAuthorResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const items = await AuthorEntity.find({ skip, take });
        return items.map(item => plainToInstance(GetAllAuthorResponse, item, { excludeExtraneousValues: true }));
    }
}

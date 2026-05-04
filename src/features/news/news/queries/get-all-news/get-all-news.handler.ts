import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { GetAllNewsQuery } from './get-all-news.query';
import { GetAllNewsResponse } from './get-all-news.response';
import { NewsEntity } from '../../news.entity';

@QueryHandler(GetAllNewsQuery)
export class GetAllNewsHandler implements IQueryHandler<GetAllNewsQuery> {
    async execute(query: GetAllNewsQuery): Promise<GetAllNewsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const where: Record<string, any> = {};
        if (query.filters.categoryId) {
            where['categoryId'] = query.filters.categoryId;
        }
        if (query.filters.search) {
            where['title'] = ILike(`%${query.filters.search}%`);
        }

        const newsList = await NewsEntity.find({
            where,
            skip,
            take,
            // order: { date: 'DESC' },
        });

        return plainToInstance(GetAllNewsResponse, newsList, { excludeExtraneousValues: true });
    }
}

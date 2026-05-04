import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllNewsCategoriesQuery } from './get-all-news-categories.query';
import { GetAllNewsCategoriesResponse } from './get-all-news-categories.response';
import { NewsCategoriesEntity } from '../../newsCategories.entity';

@QueryHandler(GetAllNewsCategoriesQuery)
export class GetAllNewsCategoriesHandler implements IQueryHandler<GetAllNewsCategoriesQuery> {
    async execute(query: GetAllNewsCategoriesQuery): Promise<GetAllNewsCategoriesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const categories = await NewsCategoriesEntity.find({skip, take,});

        return plainToInstance(GetAllNewsCategoriesResponse, categories, { excludeExtraneousValues: true });
    }
}

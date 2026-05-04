import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllBookCategoriesQuery } from './get-all-book-categories.query';
import { GetAllBookCategoriesResponse } from './get-all-book-categories.response';
import { BookCategoriesEntity } from '../../book-categories.entity';

@QueryHandler(GetAllBookCategoriesQuery)
export class GetAllBookCategoriesHandler implements IQueryHandler<GetAllBookCategoriesQuery> {
    async execute(query: GetAllBookCategoriesQuery): Promise<GetAllBookCategoriesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const items = await BookCategoriesEntity.find({ skip, take });
        return plainToInstance(GetAllBookCategoriesResponse, items, { excludeExtraneousValues: true });
    }
}

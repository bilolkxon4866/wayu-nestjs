import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneBookCategoryQuery } from './get-one-book-category.query';
import { GetOneBookCategoryResponse } from './get-one-book-category.response';
import { BookCategoriesEntity } from '../../book-categories.entity';

@QueryHandler(GetOneBookCategoryQuery)
export class GetOneBookCategoryHandler implements IQueryHandler<GetOneBookCategoryQuery> {
    async execute(query: GetOneBookCategoryQuery): Promise<GetOneBookCategoryResponse> {
        const entity = await BookCategoriesEntity.findOneBy({ id: query.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha kategoriya topilmadi");
        }

        return plainToInstance(GetOneBookCategoryResponse, entity, { excludeExtraneousValues: true });
    }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetEventCategoryByIdQuery } from './get-event-category-by-id.query';
import { GetEventCategoryByIdResponse } from './get-event-category-by-id.response';
import {EventCategoriesEntity} from "../../eventCategories.entity";

@QueryHandler(GetEventCategoryByIdQuery)
export class GetEventCategoryByIdHandler implements IQueryHandler<GetEventCategoryByIdQuery> {
    async execute(query: GetEventCategoryByIdQuery): Promise<GetEventCategoryByIdResponse> {
        const category = await EventCategoriesEntity.findOneBy({ id: query.id });
        if (!category) {
            throw new NotFoundException('Berilgan id boyicha kategoriya topilmadi');
        }

        return plainToInstance(GetEventCategoryByIdResponse, category, { excludeExtraneousValues: true });
    }
}

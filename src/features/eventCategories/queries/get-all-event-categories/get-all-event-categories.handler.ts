import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { GetAllEventCategoriesQuery } from './get-all-event-categories.query';
import { GetAllEventCategoriesResponse } from './get-all-event-categories.response';
import {EventCategoriesEntity} from "../../eventCategories.entity";

@QueryHandler(GetAllEventCategoriesQuery)
export class GetAllEventCategoriesHandler implements IQueryHandler<GetAllEventCategoriesQuery> {
    async execute(query: GetAllEventCategoriesQuery): Promise<GetAllEventCategoriesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const where: Record<string, any> = {};
        if (query.filters.search) {
            where['title'] = ILike(`%${query.filters.search}%`);
        }

        const categories = await EventCategoriesEntity.find({
            where,
            skip,
            take,
            order: { createdAt: 'DESC' },
        });

        return plainToInstance(GetAllEventCategoriesResponse, categories, { excludeExtraneousValues: true });
    }
}

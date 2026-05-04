import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { GetAllTagsQuery } from './get-all-tags.query';
import { GetAllTagsResponse } from './get-all-tags.response';
import {TagsEntity} from "../../tags.entity";

@QueryHandler(GetAllTagsQuery)
export class GetAllTagsHandler implements IQueryHandler<GetAllTagsQuery> {
    async execute(query: GetAllTagsQuery): Promise<GetAllTagsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const where: Record<string, any> = {};
        if (query.filters.search) {
            where['title'] = ILike(`%${query.filters.search}%`);
        }

        const tags = await TagsEntity.find({
            where,
            skip,
            take,
            order: { createdAt: 'DESC' },
        });

        return plainToInstance(GetAllTagsResponse, tags, { excludeExtraneousValues: true });
    }
}

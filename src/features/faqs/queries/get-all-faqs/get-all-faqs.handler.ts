import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { GetAllFaqsQuery } from './get-all-faqs.query';
import { GetAllFaqsResponse } from './get-all-faqs.response';
import {FaqsEntity} from "../../faqs.entity";

@QueryHandler(GetAllFaqsQuery)
export class GetAllFaqsHandler implements IQueryHandler<GetAllFaqsQuery> {
    async execute(query: GetAllFaqsQuery): Promise<GetAllFaqsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const where: Record<string, any> = {};
        if (query.filters.search) {
            where['question'] = ILike(`%${query.filters.search}%`);
        }

        const faqs = await FaqsEntity.find({
            where,
            skip,
            take,
        });

        return plainToInstance(GetAllFaqsResponse, faqs, { excludeExtraneousValues: true });
    }
}

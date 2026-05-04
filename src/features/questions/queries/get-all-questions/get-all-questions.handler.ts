import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { GetAllQuestionsQuery } from './get-all-questions.query';
import { GetAllQuestionsResponse } from './get-all-questions.response';
import {QuestionsEntity} from "../../questions.entity";

@QueryHandler(GetAllQuestionsQuery)
export class GetAllQuestionsHandler implements IQueryHandler<GetAllQuestionsQuery> {
    async execute(query: GetAllQuestionsQuery): Promise<GetAllQuestionsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const where: Record<string, any> = {};
        if (query.filters.status) {
            where['status'] = query.filters.status;
        }
        if (query.filters.search) {
            where['fullName'] = ILike(`%${query.filters.search}%`);
        }

        const questions = await QuestionsEntity.find({
            where,
            skip,
            take,
            order: { createdAt: 'DESC' },
        });

        return plainToInstance(GetAllQuestionsResponse, questions, { excludeExtraneousValues: true });
    }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetQuestionByIdQuery } from './get-question-by-id.query';
import { GetQuestionByIdResponse } from './get-question-by-id.response';
import {QuestionsEntity} from "../../questions.entity";

@QueryHandler(GetQuestionByIdQuery)
export class GetQuestionByIdHandler implements IQueryHandler<GetQuestionByIdQuery> {
    async execute(query: GetQuestionByIdQuery): Promise<GetQuestionByIdResponse> {
        const question = await QuestionsEntity.findOneBy({ id: query.id });
        if (!question) {
            throw new NotFoundException('Berilgan id boyicha savol topilmadi');
        }

        return plainToInstance(GetQuestionByIdResponse, question, { excludeExtraneousValues: true });
    }
}

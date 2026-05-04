import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetFaqByIdQuery } from './get-faq-by-id.query';
import { GetFaqByIdResponse } from './get-faq-by-id.response';
import {FaqsEntity} from "../../faqs.entity";

@QueryHandler(GetFaqByIdQuery)
export class GetFaqByIdHandler implements IQueryHandler<GetFaqByIdQuery> {
    async execute(query: GetFaqByIdQuery): Promise<GetFaqByIdResponse> {
        const faq = await FaqsEntity.findOne({
            where: { id: query.id },
            relations: ['faqsTags', 'faqsTags.tag'],
        });

        if (!faq) {
            throw new NotFoundException('Berilgan id boyicha FAQ topilmadi');
        }

        return plainToInstance(GetFaqByIdResponse, faq, { excludeExtraneousValues: true });
    }
}

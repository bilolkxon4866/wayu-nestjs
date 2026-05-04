import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetLanguageByIdQuery } from './get-language-by-id.query';
import { GetLanguageByIdResponse } from './get-language-by-id.response';
import {LanguagesEntity} from "../../languages.entity";

@QueryHandler(GetLanguageByIdQuery)
export class GetLanguageByIdHandler implements IQueryHandler<GetLanguageByIdQuery> {
    async execute(query: GetLanguageByIdQuery): Promise<GetLanguageByIdResponse> {
        const language = await LanguagesEntity.findOneBy({ id: query.id });
        if (!language) {
            throw new NotFoundException('Berilgan id boyicha til topilmadi');
        }

        return plainToInstance(GetLanguageByIdResponse, language, { excludeExtraneousValues: true });
    }
}

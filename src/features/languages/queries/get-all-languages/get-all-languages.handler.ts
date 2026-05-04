import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { GetAllLanguagesQuery } from './get-all-languages.query';
import { GetAllLanguagesResponse } from './get-all-languages.response';
import {LanguagesEntity} from "../../languages.entity";

@QueryHandler(GetAllLanguagesQuery)
export class GetAllLanguagesHandler implements IQueryHandler<GetAllLanguagesQuery> {
    async execute(query: GetAllLanguagesQuery): Promise<GetAllLanguagesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const where: Record<string, any> = {};
        if (query.filters.search) {
            where['title'] = ILike(`%${query.filters.search}%`);
        }

        const languages = await LanguagesEntity.find({
            where,
            skip,
            take,
            order: { createdAt: 'DESC' },
        });

        return plainToInstance(GetAllLanguagesResponse, languages, { excludeExtraneousValues: true });
    }
}

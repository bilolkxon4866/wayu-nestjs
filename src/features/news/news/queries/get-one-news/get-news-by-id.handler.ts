import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetNewsByIdQuery } from './get-news-by-id.query';
import { GetNewsByIdResponse } from './get-news-by-id.response';
import { NewsEntity } from '../../news.entity';

@QueryHandler(GetNewsByIdQuery)
export class GetNewsByIdHandler implements IQueryHandler<GetNewsByIdQuery> {
    async execute(query: GetNewsByIdQuery): Promise<GetNewsByIdResponse> {
        const news = await NewsEntity.findOne({
            where: { id: query.id },
            relations: ['newsCategory', 'country'],
        });

        if (!news) {
            throw new NotFoundException('Berilgan id boyicha yangilik topilmadi');
        }

        return plainToInstance(GetNewsByIdResponse, news, { excludeExtraneousValues: true });
    }
}

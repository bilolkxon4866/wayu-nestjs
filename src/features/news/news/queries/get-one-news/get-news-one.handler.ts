import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetNewsOneQuery } from './get-news-one.query';
import { GetNewsOneResponse } from './get-news-one.response';
import { NewsEntity } from '../../news.entity';

@QueryHandler(GetNewsOneQuery)
export class GetNewsOneHandler implements IQueryHandler<GetNewsOneQuery> {
    async execute(query: GetNewsOneQuery): Promise<GetNewsOneResponse> {
        const news = await NewsEntity.findOne({
            where: { id: query.id },
            relations: ['newsCategory', 'country'],
        });

        if (!news) {
            throw new NotFoundException('Berilgan id boyicha yangilik topilmadi');
        }

        return plainToInstance(GetNewsOneResponse, news, { excludeExtraneousValues: true });
    }
}

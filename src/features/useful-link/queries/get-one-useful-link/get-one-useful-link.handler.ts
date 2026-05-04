import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneUsefulLinkQuery } from './get-one-useful-link.query';
import { GetOneUsefulLinkResponse } from './get-one-useful-link.response';
import { UsefulLinkEntity } from '../../usefulLink.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOneUsefulLinkQuery)
export class GetOneUsefulLinkHandler implements IQueryHandler<GetOneUsefulLinkQuery> {
    async execute(query: GetOneUsefulLinkQuery): Promise<GetOneUsefulLinkResponse> {
        const item = await UsefulLinkEntity.findOneBy({ id: query.id });
        if (!item) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }

        return plainToInstance(GetOneUsefulLinkResponse, item, { excludeExtraneousValues: true });
    }
}

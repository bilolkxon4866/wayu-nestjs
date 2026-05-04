import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneSocialLinksQuery } from './get-one-social-links.query';
import { GetOneSocialLinksResponse } from './get-one-social-links.response';
import { SocialLinksEntity } from '../../socialLinks.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOneSocialLinksQuery)
export class GetOneSocialLinksHandler implements IQueryHandler<GetOneSocialLinksQuery> {
    async execute(query: GetOneSocialLinksQuery): Promise<GetOneSocialLinksResponse> {
        const item = await SocialLinksEntity.findOneBy({ id: query.id });
        if (!item) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }

        return plainToInstance(GetOneSocialLinksResponse, item, { excludeExtraneousValues: true });
    }
}

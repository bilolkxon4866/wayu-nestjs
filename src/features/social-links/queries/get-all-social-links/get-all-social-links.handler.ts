import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllSocialLinksQuery } from './get-all-social-links.query';
import { GetAllSocialLinksResponse } from './get-all-social-links.response';
import { SocialLinksEntity } from '../../socialLinks.entity';

@QueryHandler(GetAllSocialLinksQuery)
export class GetAllSocialLinksHandler implements IQueryHandler<GetAllSocialLinksQuery> {
    async execute(query: GetAllSocialLinksQuery): Promise<GetAllSocialLinksResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const items = await SocialLinksEntity.find({ skip, take });
        return items.map(item => plainToInstance(GetAllSocialLinksResponse, item, { excludeExtraneousValues: true }));
    }
}

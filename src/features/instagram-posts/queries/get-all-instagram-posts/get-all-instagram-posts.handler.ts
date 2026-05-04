import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllInstagramPostsQuery } from './get-all-instagram-posts.query';
import { GetAllInstagramPostsResponse } from './get-all-instagram-posts.response';
import {InstagramPostsEntity} from "../../instagramPosts.entity";

@QueryHandler(GetAllInstagramPostsQuery)
export class GetAllInstagramPostsHandler implements IQueryHandler<GetAllInstagramPostsQuery> {
    async execute(query: GetAllInstagramPostsQuery): Promise<GetAllInstagramPostsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const posts = await InstagramPostsEntity.find({
            skip,
            take,
        });

        return plainToInstance(GetAllInstagramPostsResponse, posts, { excludeExtraneousValues: true });
    }
}

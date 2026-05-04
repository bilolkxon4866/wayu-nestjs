import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetInstagramPostByIdQuery } from './get-instagram-post-by-id.query';
import { GetInstagramPostByIdResponse } from './get-instagram-post-by-id.response';
import {InstagramPostsEntity} from "../../instagramPosts.entity";

@QueryHandler(GetInstagramPostByIdQuery)
export class GetInstagramPostByIdHandler implements IQueryHandler<GetInstagramPostByIdQuery> {
    async execute(query: GetInstagramPostByIdQuery): Promise<GetInstagramPostByIdResponse> {
        const post = await InstagramPostsEntity.findOneBy({ id: query.id });
        if (!post) {
            throw new NotFoundException('Berilgan id boyicha Instagram post topilmadi');
        }

        return plainToInstance(GetInstagramPostByIdResponse, post, { excludeExtraneousValues: true });
    }
}

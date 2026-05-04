import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateInstagramPostCommand } from './create-instagram-post.command';
import { CreateInstagramPostResponse } from './create-instagram-post.response';
import {InstagramPostsEntity} from "../../instagramPosts.entity";

@CommandHandler(CreateInstagramPostCommand)
export class CreateInstagramPostHandler implements ICommandHandler<CreateInstagramPostCommand> {
    async execute(cmd: CreateInstagramPostCommand): Promise<CreateInstagramPostResponse> {
        const alreadyExists = await InstagramPostsEntity.existsBy({ link: cmd.link });
        if (alreadyExists) {
            throw new BadRequestException('Bunday link bilan post allaqachon mavjud');
        }

        const post = InstagramPostsEntity.create({
            image: cmd.image,
            link: cmd.link,
        } as InstagramPostsEntity);

        await InstagramPostsEntity.save(post);

        return plainToInstance(CreateInstagramPostResponse, post, { excludeExtraneousValues: true });
    }
}

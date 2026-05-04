import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateInstagramPostCommand } from './update-instagram-post.command';
import {InstagramPostsEntity} from "../../instagramPosts.entity";

@CommandHandler(UpdateInstagramPostCommand)
export class UpdateInstagramPostHandler implements ICommandHandler<UpdateInstagramPostCommand> {
    async execute(cmd: UpdateInstagramPostCommand): Promise<void> {
        const post = await InstagramPostsEntity.findOneBy({ id: cmd.id });
        if (!post) {
            throw new NotFoundException('Berilgan id boyicha Instagram post topilmadi');
        }

        if (cmd.link && cmd.link !== post.link) {
            const alreadyExists = await InstagramPostsEntity.existsBy({ link: cmd.link });
            if (alreadyExists) {
                throw new BadRequestException('Bunday link bilan post allaqachon mavjud');
            }
            post.link = cmd.link;
        }

        if (cmd.image !== undefined) post.image = cmd.image;

        await InstagramPostsEntity.save(post);
    }
}

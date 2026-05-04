import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteInstagramPostCommand } from './delete-instagram-post.command';
import {InstagramPostsEntity} from "../../instagramPosts.entity";

@CommandHandler(DeleteInstagramPostCommand)
export class DeleteInstagramPostHandler implements ICommandHandler<DeleteInstagramPostCommand> {
    async execute(cmd: DeleteInstagramPostCommand): Promise<void> {
        const post = await InstagramPostsEntity.findOneBy({ id: cmd.id });
        if (!post) {
            throw new NotFoundException('Berilgan id boyicha Instagram post topilmadi');
        }

        await InstagramPostsEntity.remove(post);
    }
}

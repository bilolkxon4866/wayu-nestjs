import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { InstagramPostsController } from './instagram-posts.controller';
import { CreateInstagramPostHandler } from './commands/create-instagram-post/create-instagram-post.handler';
import { UpdateInstagramPostHandler } from './commands/update-instagram-post/update-instagram-post.handler';
import { DeleteInstagramPostHandler } from './commands/delete-instagram-post/delete-instagram-post.handler';
import { GetAllInstagramPostsHandler } from './queries/get-all-instagram-posts/get-all-instagram-posts.handler';
import { GetInstagramPostByIdHandler } from './queries/get-instagram-post-by-id/get-instagram-post-by-id.handler';

@Module({
    imports: [CqrsModule],
    controllers: [InstagramPostsController],
    providers: [
        CreateInstagramPostHandler,
        UpdateInstagramPostHandler,
        DeleteInstagramPostHandler,
        GetAllInstagramPostsHandler,
        GetInstagramPostByIdHandler,
    ],
})
export class InstagramPostsModule {}

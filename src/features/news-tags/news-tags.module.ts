import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { NewsTagsController } from './news-tags.controller';
import { CreateNewsTagHandler } from './commands/create-news-tag/create-news-tag.handler';
import { DeleteNewsTagHandler } from './commands/delete-news-tag/delete-news-tag.handler';

@Module({
    imports: [CqrsModule],
    controllers: [NewsTagsController],
    providers: [
        CreateNewsTagHandler,
        DeleteNewsTagHandler,
    ],
})
export class NewsTagsModule {}

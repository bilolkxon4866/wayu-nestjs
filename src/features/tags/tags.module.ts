import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TagsController } from './tags.controller';
import { CreateTagHandler } from './commands/create-tag/create-tag.handler';
import { UpdateTagHandler } from './commands/update-tag/update-tag.handler';
import { DeleteTagHandler } from './commands/delete-tag/delete-tag.handler';
import { GetAllTagsHandler } from './queries/get-all-tags/get-all-tags.handler';
import { GetTagByIdHandler } from './queries/get-tag-by-id/get-tag-by-id.handler';

@Module({
    imports: [CqrsModule],
    controllers: [TagsController],
    providers: [
        CreateTagHandler,
        UpdateTagHandler,
        DeleteTagHandler,
        GetAllTagsHandler,
        GetTagByIdHandler,
    ],
})
export class TagsModule {}

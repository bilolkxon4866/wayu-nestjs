import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FaqsTagsController } from './faqs-tags.controller';
import { CreateFaqsTagHandler } from './commands/create-faqs-tag/create-faqs-tag.handler';
import { DeleteFaqsTagHandler } from './commands/delete-faqs-tag/delete-faqs-tag.handler';

@Module({
    imports: [CqrsModule],
    controllers: [FaqsTagsController],
    providers: [
        CreateFaqsTagHandler,
        DeleteFaqsTagHandler,
    ],
})
export class FaqsTagsModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FaqsController } from './faqs.controller';
import { CreateFaqHandler } from './commands/create-faq/create-faq.handler';
import { UpdateFaqHandler } from './commands/update-faq/update-faq.handler';
import { DeleteFaqHandler } from './commands/delete-faq/delete-faq.handler';
import { GetAllFaqsHandler } from './queries/get-all-faqs/get-all-faqs.handler';
import { GetFaqByIdHandler } from './queries/get-faq-by-id/get-faq-by-id.handler';

@Module({
    imports: [CqrsModule],
    controllers: [FaqsController],
    providers: [
        CreateFaqHandler,
        UpdateFaqHandler,
        DeleteFaqHandler,
        GetAllFaqsHandler,
        GetFaqByIdHandler,
    ],
})
export class FaqsModule {}

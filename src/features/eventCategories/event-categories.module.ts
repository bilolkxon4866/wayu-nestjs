import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { EventCategoriesController } from './event-categories.controller';
import { CreateEventCategoryHandler } from './commands/create-event-category/create-event-category.handler';
import { UpdateEventCategoryHandler } from './commands/update-event-category/update-event-category.handler';
import { DeleteEventCategoryHandler } from './commands/delete-event-category/delete-event-category.handler';
import { GetAllEventCategoriesHandler } from './queries/get-all-event-categories/get-all-event-categories.handler';
import { GetEventCategoryByIdHandler } from './queries/get-event-category-by-id/get-event-category-by-id.handler';

@Module({
    imports: [CqrsModule],
    controllers: [EventCategoriesController],
    providers: [
        CreateEventCategoryHandler,
        UpdateEventCategoryHandler,
        DeleteEventCategoryHandler,
        GetAllEventCategoriesHandler,
        GetEventCategoryByIdHandler,
    ],
})
export class EventCategoriesModule {}

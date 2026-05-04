import { Command } from '@nestjs/cqrs';
import { CreateEventCategoryResponse } from './create-event-category.response';

export class CreateEventCategoryCommand extends Command<CreateEventCategoryResponse> {
    title!: string;
}

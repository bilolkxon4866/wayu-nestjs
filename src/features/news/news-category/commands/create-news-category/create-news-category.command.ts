import { Command } from '@nestjs/cqrs';
import { CreateNewsCategoryResponse } from './create-news-category.response';

export class CreateNewsCategoryCommand extends Command<CreateNewsCategoryResponse> {
    title!: string;
}

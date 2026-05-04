import { Command } from '@nestjs/cqrs';
import { CreateNewsResponse } from './create-news.response';

export class CreateNewsCommand extends Command<CreateNewsResponse> {
    title!: string;
    image!: string;
    date!: Date;
    content!: string;
    categoryId!: number;
    countryId?: number;
}

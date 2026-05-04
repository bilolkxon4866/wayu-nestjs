import { Command } from '@nestjs/cqrs';
import { CreateNewsTagResponse } from './create-news-tag.response';

export class CreateNewsTagCommand extends Command<CreateNewsTagResponse> {
    newsId!: number;
    tagId!: number;
}

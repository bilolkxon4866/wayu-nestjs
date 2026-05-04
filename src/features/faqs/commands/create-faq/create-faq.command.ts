import { Command } from '@nestjs/cqrs';
import { CreateFaqResponse } from './create-faq.response';

export class CreateFaqCommand extends Command<CreateFaqResponse> {
    question!: string;
    answer!: string;
    tagIds?: number[];
}

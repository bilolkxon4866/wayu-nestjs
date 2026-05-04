import { Command } from '@nestjs/cqrs';
import { CreateFaqsTagResponse } from './create-faqs-tag.response';

export class CreateFaqsTagCommand extends Command<CreateFaqsTagResponse> {
    faqsId!: number;
    tagId!: number;
}

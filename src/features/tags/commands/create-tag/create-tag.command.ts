import { Command } from '@nestjs/cqrs';
import { CreateTagResponse } from './create-tag.response';

export class CreateTagCommand extends Command<CreateTagResponse> {
    title!: string;
}

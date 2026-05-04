import { Command } from '@nestjs/cqrs';
import { CreateLanguageResponse } from './create-language.response';

export class CreateLanguageCommand extends Command<CreateLanguageResponse> {
    title!: string;
}

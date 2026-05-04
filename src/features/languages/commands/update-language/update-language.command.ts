import { Command } from '@nestjs/cqrs';

export class UpdateLanguageCommand extends Command<void> {
    id!: number;
    title!: string;
}

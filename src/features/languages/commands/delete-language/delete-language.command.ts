import { Command } from '@nestjs/cqrs';

export class DeleteLanguageCommand extends Command<void> {
    id!: number;
}

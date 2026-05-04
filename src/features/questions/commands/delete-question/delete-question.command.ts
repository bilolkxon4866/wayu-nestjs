import { Command } from '@nestjs/cqrs';

export class DeleteQuestionCommand extends Command<void> {
    id!: number;
}

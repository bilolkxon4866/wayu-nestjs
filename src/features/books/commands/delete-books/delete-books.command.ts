import { Command } from '@nestjs/cqrs';

export class DeleteBooksCommand extends Command<void> {
    id!: number;
}

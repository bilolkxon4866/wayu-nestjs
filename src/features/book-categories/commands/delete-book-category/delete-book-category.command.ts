import { Command } from '@nestjs/cqrs';

export class DeleteBookCategoryCommand extends Command<void> {
    id!: number;
}

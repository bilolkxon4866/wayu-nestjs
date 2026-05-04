import { Command } from '@nestjs/cqrs';

export class UpdateBookCategoryCommand extends Command<void> {
    id!: number;
    title?: string;
}

import { Command } from '@nestjs/cqrs';

export class UpdateBooksCommand extends Command<void> {
    id!: number;
    title?: string;
    image?: string;
    description?: string;
    file?: string;
    pages?: number;
    year?: number;
    authorId?: number;
    bookCategoryId?: number;
}

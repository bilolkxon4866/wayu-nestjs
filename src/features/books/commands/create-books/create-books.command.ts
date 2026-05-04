import { Command } from '@nestjs/cqrs';
import { CreateBooksResponse } from './create-books.response';

export class CreateBooksCommand extends Command<CreateBooksResponse> {
    title!: string;
    image!: string;
    description?: string;
    file!: string;
    pages!: number;
    year!: number;
    authorId!: number;
    bookCategoryId!: number;
}

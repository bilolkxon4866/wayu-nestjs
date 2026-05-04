import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BooksController } from './books.controller';
import { CreateBooksHandler } from './commands/create-books/create-books.handler';
import { UpdateBooksHandler } from './commands/update-books/update-books.handler';
import { DeleteBooksHandler } from './commands/delete-books/delete-books.handler';
import { GetAllBooksHandler } from './queries/get-all-books/get-all-books.handler';
import { GetOneBookHandler } from './queries/get-one-book/get-one-book.handler';

@Module({
    imports: [CqrsModule],
    controllers: [BooksController],
    providers: [
        CreateBooksHandler,
        UpdateBooksHandler,
        DeleteBooksHandler,
        GetAllBooksHandler,
        GetOneBookHandler,
    ],
})
export class BooksModule {}

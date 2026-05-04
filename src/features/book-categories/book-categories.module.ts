import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BookCategoriesController } from './book-categories.controller';
import { CreateBookCategoryHandler } from './commands/create-book-category/create-book-category.handler';
import { UpdateBookCategoryHandler } from './commands/update-book-category/update-book-category.handler';
import { DeleteBookCategoryHandler } from './commands/delete-book-category/delete-book-category.handler';
import { GetOneBookCategoryHandler } from './queries/get-one-book-category/get-one-book-category.handler';
import { GetAllBookCategoriesHandler } from './queries/get-all-book-categories/get-all-book-categories.handler';

@Module({
    imports: [CqrsModule],
    controllers: [BookCategoriesController],
    providers: [
        CreateBookCategoryHandler,
        UpdateBookCategoryHandler,
        DeleteBookCategoryHandler,
        GetAllBookCategoriesHandler,
        GetOneBookCategoryHandler,
    ],
})
export class BookCategoriesModule {}

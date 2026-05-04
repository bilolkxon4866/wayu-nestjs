import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NewsCategoryController } from './news-category/news-category.controller';
import { CreateNewsCategoryHandler } from './news-category/commands/create-news-category/create-news-category.handler';
import { UpdateNewsCategoryHandler } from './news-category/commands/update-news-category/update-news-category.handler';
import { DeleteNewsCategoryHandler } from './news-category/commands/delete-news-category/delete-news-category.handler';
import { GetAllNewsCategoriesHandler } from './news-category/queries/get-all-news-categories/get-all-news-categories.handler';
import { NewsController } from './news/news.controller';
import { CreateNewsHandler } from './news/commands/create-news/create-news.handler';
import { UpdateNewsHandler } from './news/commands/update-news/update-news.handler';
import { DeleteNewsHandler } from './news/commands/delete-news/delete-news.handler';
import { GetAllNewsHandler } from './news/queries/get-all-news/get-all-news.handler';
import { GetNewsByIdHandler } from './news/queries/get-one-news/get-news-by-id.handler';
import {GetOneNewsCategoryHandler} from "./news-category/queries/get-one-news-categories/get-one-newsCategory.handler";

@Module({
    imports: [CqrsModule],
    controllers: [
        NewsCategoryController,
        NewsController,
    ],
    providers: [
        CreateNewsCategoryHandler,
        UpdateNewsCategoryHandler,
        DeleteNewsCategoryHandler,
        GetAllNewsCategoriesHandler,
        GetOneNewsCategoryHandler,

        CreateNewsHandler,
        UpdateNewsHandler,
        DeleteNewsHandler,
        GetAllNewsHandler,
        GetNewsByIdHandler,
    ],
})
export class NewsModule {}

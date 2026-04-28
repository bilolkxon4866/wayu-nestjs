import {Module} from "@nestjs/common";
import {NewsCategoryController} from "./news-category/news-category.controller";
import {CreateNewsCategoryHandler} from "./news-category/commands/create-news-category/create-news-category.handler";
import {GetAllNewsCategoriesHandler} from "./news-category/queries/get-all-news-categories/get-all-news-categories.handler";

@Module({
    controllers: [
        NewsCategoryController,
    ],
    providers: [
        GetAllNewsCategoriesHandler,
        CreateNewsCategoryHandler,
    ]
})
export class NewsModule{}
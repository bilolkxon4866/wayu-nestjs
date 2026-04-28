import {GetAllNewsCategoriesResponse} from "./queries/get-all-news-categories/get-all-news-categories.response";
import {Body, Controller, Query, Get, Post} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiOkResponse} from "@nestjs/swagger";
import {GetAllNewsCategoriesFilters} from "./queries/get-all-news-categories/get-all-news-categories.filters";
import {GetAllNewsCategoriesQuery} from "./queries/get-all-news-categories/get-all-news-categories.query";
import {CreateNewsCategoryResponse} from "./commands/create-news-category/create-news-category.response";
import {CreateNewsCategoryCommand} from "./commands/create-news-category/create-news-category.command";
import {CreateNewsCategoryRequest} from "./commands/create-news-category/create-news-category.request";

@Controller('admin/news-category')
export class NewsCategoryController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queriesBus: QueryBus,
    ) {
    }

    @Get()
    @ApiOkResponse({type: [GetAllNewsCategoriesResponse]})
    async getAllNewsCategories(@Query() filters: GetAllNewsCategoriesFilters){
        return await this.queriesBus.execute(new GetAllNewsCategoriesQuery(filters))
    }

    @Post()
    @ApiOkResponse({type: CreateNewsCategoryResponse})
    async createNewsCategory(@Body() req: CreateNewsCategoryRequest){
        const cmd = new CreateNewsCategoryCommand();
        cmd.title = req.title;
        return await this.commandBus.execute(cmd);
    }
}
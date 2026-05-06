import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query,} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateNewsCategoryRequest } from './commands/create-news-category/create-news-category.request';
import { CreateNewsCategoryResponse } from './commands/create-news-category/create-news-category.response';

import { UpdateNewsCategoryRequest } from './commands/update-news-category/update-news-category.request';
import { DeleteNewsCategoryCommand } from './commands/delete-news-category/delete-news-category.command';

import { GetAllNewsCategoriesFilters } from './queries/get-all-news-categories/get-all-news-categories.filters';
import { GetAllNewsCategoriesQuery } from './queries/get-all-news-categories/get-all-news-categories.query';
import { GetAllNewsCategoriesResponse } from './queries/get-all-news-categories/get-all-news-categories.response';
import {GetOneNewsCategoryResponse} from "./queries/get-one-news-categories/get-one-newsCategory.response";
import {GetOneNewsCategoryQuery} from "./queries/get-one-news-categories/get-one-newsCategory.query";

@ApiTags('News Category')
@Controller('login/news-category')
export class NewsCategoryController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllNewsCategoriesResponse] })
    async getAllNewsCategories(@Query() filters: GetAllNewsCategoriesFilters): Promise<GetAllNewsCategoriesResponse[]> {
        return this.queryBus.execute(new GetAllNewsCategoriesQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: GetOneNewsCategoryResponse})
    async getonenewsCategory(@Param('id', ParseIntPipe) id: number): Promise<GetOneNewsCategoryResponse>{
        return this.queryBus.execute(new GetOneNewsCategoryQuery(id))
    }

    @Post()
    @ApiCreatedResponse({ type: CreateNewsCategoryResponse })
    async createNewsCategory(@Body() req: CreateNewsCategoryRequest): Promise<CreateNewsCategoryResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    async updateNewsCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateNewsCategoryRequest): Promise<void> {
        return this.commandBus.execute(req.toCommand(id));
    }

    @Delete(':id')
    async deleteNewsCategory(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteNewsCategoryCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookCategoryRequest } from './commands/create-book-category/create-book-category.request'
import { GetAllBookCategoriesResponse } from './queries/get-all-book-categories/get-all-book-categories.response';
import { GetAllBookCategoriesFilters } from './queries/get-all-book-categories/get-all-book-categories.filters';
import { GetAllBookCategoriesQuery } from './queries/get-all-book-categories/get-all-book-categories.query';
import { GetOneBookCategoryResponse } from './queries/get-one-book-category/get-one-book-category.response';
import { GetOneBookCategoryQuery } from './queries/get-one-book-category/get-one-book-category.query';
import { CreateBookCategoryResponse } from './commands/create-book-category/create-book-category.response';
import { UpdateBookCategoryRequest } from './commands/update-book-category/update-book-category.request';
import { DeleteBookCategoryCommand } from './commands/delete-book-category/delete-book-category.command';

@ApiTags('BookCategories')
@Controller('login/book-categories')
export class BookCategoriesController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllBookCategoriesResponse] })
    async getAllBookCategories(
        @Query() filters: GetAllBookCategoriesFilters,
    ): Promise<GetAllBookCategoriesResponse[]> {
        return this.queryBus.execute(new GetAllBookCategoriesQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetOneBookCategoryResponse })
    async getOneBookCategory(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<GetOneBookCategoryResponse> {
        return this.queryBus.execute(new GetOneBookCategoryQuery(id));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateBookCategoryResponse })
    async createBookCategory(
        @Body() req: CreateBookCategoryRequest,
    ): Promise<CreateBookCategoryResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    async updateBookCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateBookCategoryRequest,
    ): Promise<void> {
        return this.commandBus.execute(req.toCommand(id));
    }

    @Delete(':id')
    async deleteBookCategory(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {
        const cmd = new DeleteBookCategoryCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateBooksRequest } from './commands/create-books/create-books.request';
import { CreateBooksResponse } from './commands/create-books/create-books.response';
import { UpdateBooksRequest } from './commands/update-books/update-books.request';
import { DeleteBooksCommand } from './commands/delete-books/delete-books.command';
import { GetAllBooksFilters } from './queries/get-all-books/get-all-books.filters';
import { GetAllBooksQuery } from './queries/get-all-books/get-all-books.query';
import { GetAllBooksResponse } from './queries/get-all-books/get-all-books.response';
import { GetOneBookQuery } from './queries/get-one-book/get-one-book.query';
import { GetOneBookResponse } from './queries/get-one-book/get-one-book.response';

@ApiTags('Books')
@Controller('admin/books')
export class BooksController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllBooksResponse] })
    async getAllBooks(@Query() filters: GetAllBooksFilters): Promise<GetAllBooksResponse[]> {
        return this.queryBus.execute(new GetAllBooksQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetOneBookResponse })
    async getOneBook(@Param('id', ParseIntPipe) id: number): Promise<GetOneBookResponse> {
        return this.queryBus.execute(new GetOneBookQuery(id));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateBooksResponse })
    async createBook(@Body() req: CreateBooksRequest): Promise<CreateBooksResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    async updateBook(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateBooksRequest,
    ): Promise<void> {
        return this.commandBus.execute(req.toCommand(id));
    }

    @Delete(':id')
    async deleteBook(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteBooksCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}

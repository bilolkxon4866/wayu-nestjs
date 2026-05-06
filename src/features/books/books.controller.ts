import {
    Body, Controller, Delete, Get,
    Param, ParseIntPipe, Post, Patch,
    Query, UploadedFiles, UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GetAllBooksFilters } from './queries/get-all-books/get-all-books.filters';
import { GetAllBooksQuery } from './queries/get-all-books/get-all-books.query';
import { GetAllBooksResponse } from './queries/get-all-books/get-all-books.response'
import {storageOptions} from "../../configs/multer.config";
import {GetOneBookResponse} from "./queries/get-one-book/get-one-book.response";
import {GetOneBookQuery} from "./queries/get-one-book/get-one-book.query";
import {CreateBooksResponse} from "./commands/create-books/create-books.response";
import {CreateBooksRequest} from "./commands/create-books/create-books.request";
import {UpdateBooksRequest} from "./commands/update-books/update-books.request";
import {DeleteBooksCommand} from "./commands/delete-books/delete-books.command";
@ApiTags('Books')
@Controller('login/books')
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
    async getBookById(@Param('id', ParseIntPipe) id: number): Promise<GetOneBookResponse> {
        return this.queryBus.execute(new GetOneBookQuery(id));
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiCreatedResponse({ type: CreateBooksResponse })
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'file', maxCount: 1 },
    ], { storage: storageOptions }))
    async createBook(
        @Body() req: CreateBooksRequest,
        @UploadedFiles() files: { image: Express.Multer.File[], file: Express.Multer.File[] },
    ): Promise<CreateBooksResponse> {
        const cmd = req.toCommand();
        cmd.image = files.image[0].filename;
        cmd.file = files.file[0].filename;
        return this.commandBus.execute(cmd);
    }

    @Patch(':id')
    @ApiConsumes('multipart/form-data')
    @ApiNoContentResponse()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'file', maxCount: 1 },
    ], { storage: storageOptions }))
    async updateBook(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateBooksRequest,
        @UploadedFiles() files?: { image?: Express.Multer.File[], file?: Express.Multer.File[] },
    ): Promise<void> {
        const cmd = req.toCommand(id);
        if (files?.image?.[0]) cmd.image = files.image[0].filename;
        if (files?.file?.[0]) cmd.file = files.file[0].filename;
        return this.commandBus.execute(cmd);
    }

    @Delete(':id')
    @ApiNoContentResponse()
    async deleteBook(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteBooksCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}
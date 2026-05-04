import {
    Body, Controller, Delete, Get,
    Param, ParseIntPipe, Post, Patch,
    Query, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../configs/multer.config';

import { CreateNewsRequest } from './commands/create-news/create-news.request';
import { CreateNewsResponse } from './commands/create-news/create-news.response';
import { UpdateNewsRequest } from './commands/update-news/update-news.request';
import { DeleteNewsCommand } from './commands/delete-news/delete-news.command';
import { GetAllNewsFilters } from './queries/get-all-news/get-all-news.filters';
import { GetAllNewsQuery } from './queries/get-all-news/get-all-news.query';
import { GetAllNewsResponse } from './queries/get-all-news/get-all-news.response'
import {GetNewsOneResponse} from "./queries/get-one-news/get-news-one.response";
import {GetNewsOneQuery} from "./queries/get-one-news/get-news-one.query";

@ApiTags('News')
@Controller('admin/news')
export class NewsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllNewsResponse] })
    async getAllNews(@Query() filters: GetAllNewsFilters): Promise<GetAllNewsResponse[]> {
        return this.queryBus.execute(new GetAllNewsQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetNewsOneResponse })
    async getNewsById(@Param('id', ParseIntPipe) id: number): Promise<GetNewsOneResponse> {
        return this.queryBus.execute(new GetNewsOneQuery(id));
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiCreatedResponse({ type: CreateNewsResponse })
    @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
    async createNews(
        @Body() req: CreateNewsRequest,
        @UploadedFile() image: Express.Multer.File,
    ): Promise<CreateNewsResponse> {
        const cmd = req.toCommand();
        cmd.image = image.filename;
        return this.commandBus.execute(cmd);
    }

    @Patch(':id')
    @ApiConsumes('multipart/form-data')
    @ApiNoContentResponse()
    @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
    async updateNews(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateNewsRequest,
        @UploadedFile() image?: Express.Multer.File,
    ): Promise<void> {
        const cmd = req.toCommand(id);
        if (image) cmd.image = image.filename;
        return this.commandBus.execute(cmd);
    }

    @Delete(':id')
    @ApiNoContentResponse()
    async deleteNews(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteNewsCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}
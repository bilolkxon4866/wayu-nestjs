import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query,} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateNewsRequest } from './commands/create-news/create-news.request';
import { CreateNewsResponse } from './commands/create-news/create-news.response';
import { UpdateNewsRequest } from './commands/update-news/update-news.request';
import { DeleteNewsCommand } from './commands/delete-news/delete-news.command';
import { GetAllNewsFilters } from './queries/get-all-news/get-all-news.filters';
import { GetAllNewsQuery } from './queries/get-all-news/get-all-news.query';
import { GetAllNewsResponse } from './queries/get-all-news/get-all-news.response';
import { GetNewsByIdQuery } from './queries/get-one-news/get-news-by-id.query';
import { GetNewsByIdResponse } from './queries/get-one-news/get-news-by-id.response';

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
    @ApiOkResponse({ type: GetNewsByIdResponse })
    async getNewsById(@Param('id', ParseIntPipe) id: number): Promise<GetNewsByIdResponse> {
        return this.queryBus.execute(new GetNewsByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateNewsResponse })
    async createNews(@Body() req: CreateNewsRequest): Promise<CreateNewsResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    async updateNews(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateNewsRequest): Promise<void> {
        return this.commandBus.execute(req.toCommand(id));
    }

    @Delete(':id')
    async deleteNews(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteNewsCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}

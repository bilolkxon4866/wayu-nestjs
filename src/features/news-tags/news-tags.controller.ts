import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';

import { CreateNewsTagRequest } from './commands/create-news-tag/create-news-tag.request';
import { CreateNewsTagResponse } from './commands/create-news-tag/create-news-tag.response';
import { DeleteNewsTagCommand } from './commands/delete-news-tag/delete-news-tag.command';

@ApiTags('News Tags')
@Controller('login/news-tags')
export class NewsTagsController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post()
    @ApiCreatedResponse({ type: CreateNewsTagResponse })
    async createNewsTag(@Body() req: CreateNewsTagRequest): Promise<CreateNewsTagResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Delete(':id')
    @ApiNoContentResponse()
    async deleteNewsTag(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteNewsTagCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}

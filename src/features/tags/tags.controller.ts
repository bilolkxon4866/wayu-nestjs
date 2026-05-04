import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe, Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateTagRequest } from './commands/create-tag/create-tag.request';
import { CreateTagResponse } from './commands/create-tag/create-tag.response';

import { UpdateTagRequest } from './commands/update-tag/update-tag.request';
import { DeleteTagCommand } from './commands/delete-tag/delete-tag.command';

import { GetAllTagsFilters } from './queries/get-all-tags/get-all-tags.filters';
import { GetAllTagsQuery } from './queries/get-all-tags/get-all-tags.query';
import { GetAllTagsResponse } from './queries/get-all-tags/get-all-tags.response';

import { GetTagByIdQuery } from './queries/get-tag-by-id/get-tag-by-id.query';
import { GetTagByIdResponse } from './queries/get-tag-by-id/get-tag-by-id.response';

@ApiTags('Tags')
@Controller('admin/tags')
export class TagsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllTagsResponse] })
    async getAllTags(@Query() filters: GetAllTagsFilters): Promise<GetAllTagsResponse[]> {
        return this.queryBus.execute(new GetAllTagsQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetTagByIdResponse })
    async getTagById(@Param('id', ParseIntPipe) id: number): Promise<GetTagByIdResponse> {
        return this.queryBus.execute(new GetTagByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateTagResponse })
    async createTag(@Body() req: CreateTagRequest): Promise<CreateTagResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    @ApiNoContentResponse()
    async updateTag(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateTagRequest,
    ): Promise<void> {
        return this.commandBus.execute(req.toCommand(id));
    }

    @Delete(':id')
    @ApiNoContentResponse()
    async deleteTag(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteTagCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}

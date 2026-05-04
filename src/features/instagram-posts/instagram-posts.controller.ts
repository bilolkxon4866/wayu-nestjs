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

import { CreateInstagramPostRequest } from './commands/create-instagram-post/create-instagram-post.request';
import { CreateInstagramPostResponse } from './commands/create-instagram-post/create-instagram-post.response';

import { UpdateInstagramPostRequest } from './commands/update-instagram-post/update-instagram-post.request';
import { DeleteInstagramPostCommand } from './commands/delete-instagram-post/delete-instagram-post.command';

import { GetAllInstagramPostsFilters } from './queries/get-all-instagram-posts/get-all-instagram-posts.filters';
import { GetAllInstagramPostsQuery } from './queries/get-all-instagram-posts/get-all-instagram-posts.query';
import { GetAllInstagramPostsResponse } from './queries/get-all-instagram-posts/get-all-instagram-posts.response';

import { GetInstagramPostByIdQuery } from './queries/get-instagram-post-by-id/get-instagram-post-by-id.query';
import { GetInstagramPostByIdResponse } from './queries/get-instagram-post-by-id/get-instagram-post-by-id.response';

@ApiTags('Instagram Posts')
@Controller('admin/instagram-posts')
export class InstagramPostsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllInstagramPostsResponse] })
    async getAllPosts(@Query() filters: GetAllInstagramPostsFilters): Promise<GetAllInstagramPostsResponse[]> {
        return this.queryBus.execute(new GetAllInstagramPostsQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetInstagramPostByIdResponse })
    async getPostById(@Param('id', ParseIntPipe) id: number): Promise<GetInstagramPostByIdResponse> {
        return this.queryBus.execute(new GetInstagramPostByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateInstagramPostResponse })
    async createPost(@Body() req: CreateInstagramPostRequest): Promise<CreateInstagramPostResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    @ApiNoContentResponse()
    async updatePost(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateInstagramPostRequest,
    ): Promise<void> {
        return this.commandBus.execute(req.toCommand(id));
    }

    @Delete(':id')
    @ApiNoContentResponse()
    async deletePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteInstagramPostCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}

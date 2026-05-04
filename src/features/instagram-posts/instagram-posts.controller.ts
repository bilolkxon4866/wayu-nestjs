// import {
//     Body,
//     Controller,
//     Delete,
//     Get,
//     Param,
//     ParseIntPipe, Patch,
//     Post,
//     Query,
// } from '@nestjs/common';
// import { CommandBus, QueryBus } from '@nestjs/cqrs';
// import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
//
// import { CreateInstagramPostRequest } from './commands/create-instagram-post/create-instagram-post.request';
// import { CreateInstagramPostResponse } from './commands/create-instagram-post/create-instagram-post.response';
//
// import { UpdateInstagramPostRequest } from './commands/update-instagram-post/update-instagram-post.request';
// import { DeleteInstagramPostCommand } from './commands/delete-instagram-post/delete-instagram-post.command';
//
// import { GetAllInstagramPostsFilters } from './queries/get-all-instagram-posts/get-all-instagram-posts.filters';
// import { GetAllInstagramPostsQuery } from './queries/get-all-instagram-posts/get-all-instagram-posts.query';
// import { GetAllInstagramPostsResponse } from './queries/get-all-instagram-posts/get-all-instagram-posts.response';
//
// import { GetInstagramPostByIdQuery } from './queries/get-instagram-post-by-id/get-instagram-post-by-id.query';
// import { GetInstagramPostByIdResponse } from './queries/get-instagram-post-by-id/get-instagram-post-by-id.response';
//
// @ApiTags('Instagram Posts')
// @Controller('admin/instagram-posts')
// export class InstagramPostsController {
//     constructor(
//         private readonly commandBus: CommandBus,
//         private readonly queryBus: QueryBus,
//     ) {}
//
//     @Get()
//     @ApiOkResponse({ type: [GetAllInstagramPostsResponse] })
//     async getAllPosts(@Query() filters: GetAllInstagramPostsFilters): Promise<GetAllInstagramPostsResponse[]> {
//         return this.queryBus.execute(new GetAllInstagramPostsQuery(filters));
//     }
//
//     @Get(':id')
//     @ApiOkResponse({ type: GetInstagramPostByIdResponse })
//     async getPostById(@Param('id', ParseIntPipe) id: number): Promise<GetInstagramPostByIdResponse> {
//         return this.queryBus.execute(new GetInstagramPostByIdQuery(id));
//     }
//
//     @Post()
//     @ApiCreatedResponse({ type: CreateInstagramPostResponse })
//     async createPost(@Body() req: CreateInstagramPostRequest): Promise<CreateInstagramPostResponse> {
//         return this.commandBus.execute(req.toCommand());
//     }
//
//     @Patch(':id')
//     @ApiNoContentResponse()
//     async updatePost(
//         @Param('id', ParseIntPipe) id: number,
//         @Body() req: UpdateInstagramPostRequest,
//     ): Promise<void> {
//         return this.commandBus.execute(req.toCommand(id));
//     }
//
//     @Delete(':id')
//     @ApiNoContentResponse()
//     async deletePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
//         const cmd = new DeleteInstagramPostCommand();
//         cmd.id = id;
//         return this.commandBus.execute(cmd);
//     }
// }








import {
    Body, Controller, Delete, Get,
    Param, ParseIntPipe, Post, Patch,
    Query, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateInstagramPostRequest } from './commands/create-instagram-post/create-instagram-post.request';
import { CreateInstagramPostResponse } from './commands/create-instagram-post/create-instagram-post.response';
import { UpdateInstagramPostRequest } from './commands/update-instagram-post/update-instagram-post.request';
import { DeleteInstagramPostCommand } from './commands/delete-instagram-post/delete-instagram-post.command';
import { GetAllInstagramPostsFilters } from './queries/get-all-instagram-posts/get-all-instagram-posts.filters';
import { GetAllInstagramPostsQuery } from './queries/get-all-instagram-posts/get-all-instagram-posts.query';
import { GetAllInstagramPostsResponse } from './queries/get-all-instagram-posts/get-all-instagram-posts.response';
import { GetInstagramPostByIdQuery } from './queries/get-instagram-post-by-id/get-instagram-post-by-id.query';
import { GetInstagramPostByIdResponse } from './queries/get-instagram-post-by-id/get-instagram-post-by-id.response';
import {storageOptions} from "../../configs/multer.config";

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
    @ApiConsumes('multipart/form-data')
    @ApiCreatedResponse({ type: CreateInstagramPostResponse })
    @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
    async createPost(
        @Body() req: CreateInstagramPostRequest,
        @UploadedFile() image: Express.Multer.File,
    ): Promise<CreateInstagramPostResponse> {
        const cmd = req.toCommand();
        cmd.image = image.filename;
        return this.commandBus.execute(cmd);
    }

    @Patch(':id')
    @ApiConsumes('multipart/form-data')
    @ApiNoContentResponse()
    @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
    async updatePost(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateInstagramPostRequest,
        @UploadedFile() image?: Express.Multer.File,
    ): Promise<void> {
        const cmd = req.toCommand(id);
        if (image) cmd.image = image.filename;
        return this.commandBus.execute(cmd);
    }

    @Delete(':id')
    @ApiNoContentResponse()
    async deletePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteInstagramPostCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}
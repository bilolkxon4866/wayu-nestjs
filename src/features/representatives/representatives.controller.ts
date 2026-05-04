// import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
// import { CommandBus, QueryBus } from '@nestjs/cqrs';
// import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
// import { CreateRepresentativesRequest } from './commands/create-representatives/create-representatives.request';
// import { CreateRepresentativesResponse } from './commands/create-representatives/create-representatives.response';
// import { UpdateRepresentativesRequest } from './commands/update-representatives/update-representatives.request';
// import { DeleteRepresentativesCommand } from './commands/delete-representatives/delete-representatives.command';
// import { GetAllRepresentativesFilters } from './queries/get-all-representatives/get-all-representatives.filters';
// import { GetAllRepresentativesQuery } from './queries/get-all-representatives/get-all-representatives.query';
// import { GetAllRepresentativesResponse } from './queries/get-all-representatives/get-all-representatives.response';
// import { GetOneRepresentativesQuery } from './queries/get-one-representatives/get-one-representatives.query';
// import { GetOneRepresentativesResponse } from './queries/get-one-representatives/get-one-representatives.response';
//
// @ApiTags('Representatives')
// @Controller('admin/representatives')
// export class RepresentativesController {
//     constructor(
//         private readonly commandBus: CommandBus,
//         private readonly queryBus: QueryBus,
//     ) {}
//
//     @Get()
//     @ApiOkResponse({ type: [GetAllRepresentativesResponse] })
//     async getAllRepresentatives(@Query() filters: GetAllRepresentativesFilters): Promise<GetAllRepresentativesResponse[]> {
//         return this.queryBus.execute(new GetAllRepresentativesQuery(filters));
//     }
//
//     @Get(':id')
//     @ApiOkResponse({ type: GetOneRepresentativesResponse })
//     async getOneRepresentatives(@Param('id', ParseIntPipe) id: number): Promise<GetOneRepresentativesResponse> {
//         return this.queryBus.execute(new GetOneRepresentativesQuery(id));
//     }
//
//     @Post()
//     @ApiCreatedResponse({ type: CreateRepresentativesResponse })
//     async createRepresentatives(@Body() req: CreateRepresentativesRequest): Promise<CreateRepresentativesResponse> {
//         return this.commandBus.execute(req.toCommand());
//     }
//
//     @Patch(':id')
//     async updateRepresentatives(
//         @Param('id', ParseIntPipe) id: number,
//         @Body() req: UpdateRepresentativesRequest,
//     ): Promise<void> {
//         return this.commandBus.execute(req.toCommand(id));
//     }
//
//     @Delete(':id')
//     async deleteRepresentatives(@Param('id', ParseIntPipe) id: number): Promise<void> {
//         const cmd = new DeleteRepresentativesCommand();
//         cmd.id = id;
//         return this.commandBus.execute(cmd);
//     }
// }







import {
    Body, Controller, Delete, Get,
    Param, ParseIntPipe, Post, Patch,
    Query, UploadedFiles, UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { GetAllRepresentativesFilters } from './queries/get-all-representatives/get-all-representatives.filters';
import { GetAllRepresentativesQuery } from './queries/get-all-representatives/get-all-representatives.query';
import { GetAllRepresentativesResponse } from './queries/get-all-representatives/get-all-representatives.response';
import {GetOneRepresentativesResponse} from "./queries/get-one-representatives/get-one-representatives.response";
import {GetOneRepresentativesQuery} from "./queries/get-one-representatives/get-one-representatives.query";
import {CreateRepresentativesResponse} from "./commands/create-representatives/create-representatives.response";
import {storageOptions} from "../../configs/multer.config";
import {CreateRepresentativesRequest} from "./commands/create-representatives/create-representatives.request";
import {UpdateRepresentativesRequest} from "./commands/update-representatives/update-representatives.request";
import {DeleteRepresentativesCommand} from "./commands/delete-representatives/delete-representatives.command";

@ApiTags('Representatives')
@Controller('admin/representatives')
export class RepresentativesController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllRepresentativesResponse] })
    async getAllRepresentatives(@Query() filters: GetAllRepresentativesFilters): Promise<GetAllRepresentativesResponse[]> {
        return this.queryBus.execute(new GetAllRepresentativesQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetOneRepresentativesResponse })
    async getRepresentativeById(@Param('id', ParseIntPipe) id: number): Promise<GetOneRepresentativesResponse> {
        return this.queryBus.execute(new GetOneRepresentativesQuery(id));
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiCreatedResponse({ type: CreateRepresentativesResponse })
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'resume', maxCount: 1 },
    ], { storage: storageOptions }))
    async createRepresentative(
        @Body() req: CreateRepresentativesRequest,
        @UploadedFiles() files: { image: Express.Multer.File[], resume: Express.Multer.File[] },
    ): Promise<CreateRepresentativesResponse> {
        const cmd = req.toCommand();
        cmd.image = files.image[0].filename;
        cmd.resume = files.resume[0].filename;
        return this.commandBus.execute(cmd);
    }

    @Patch(':id')
    @ApiConsumes('multipart/form-data')
    @ApiNoContentResponse()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'resume', maxCount: 1 },
    ], { storage: storageOptions }))
    async updateRepresentative(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateRepresentativesRequest,
        @UploadedFiles() files?: { image?: Express.Multer.File[], resume?: Express.Multer.File[] },
    ): Promise<void> {
        const cmd = req.toCommand(id);
        if (files?.image?.[0]) cmd.image = files.image[0].filename;
        if (files?.resume?.[0]) cmd.resume = files.resume[0].filename;
        return this.commandBus.execute(cmd);
    }

    @Delete(':id')
    @ApiNoContentResponse()
    async deleteRepresentative(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteRepresentativesCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}
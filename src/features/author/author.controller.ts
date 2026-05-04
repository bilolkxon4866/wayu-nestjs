import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthorRequest } from './commands/create-author/create-author.request';
import { CreateAuthorResponse } from './commands/create-author/create-author.response';
import { UpdateAuthorRequest } from './commands/update-author/update-author.request';
import { DeleteAuthorCommand } from './commands/delete-author/delete-author.command';
import { GetAllAuthorFilters } from './queries/get-all-author/get-all-author.filters';
import { GetAllAuthorQuery } from './queries/get-all-author/get-all-author.query';
import { GetAllAuthorResponse } from './queries/get-all-author/get-all-author.response';
import { GetOneAuthorQuery } from './queries/get-one-author/get-one-author.query';
import { GetOneAuthorResponse } from './queries/get-one-author/get-one-author.response';

@ApiTags('Author')
@Controller('admin/authors')
export class AuthorController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllAuthorResponse] })
    async getAllAuthor(@Query() filters: GetAllAuthorFilters): Promise<GetAllAuthorResponse[]> {
        return this.queryBus.execute(new GetAllAuthorQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetOneAuthorResponse })
    async getOneAuthor(@Param('id', ParseIntPipe) id: number): Promise<GetOneAuthorResponse> {
        return this.queryBus.execute(new GetOneAuthorQuery(id));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateAuthorResponse })
    async createAuthor(@Body() req: CreateAuthorRequest): Promise<CreateAuthorResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    async updateAuthor(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateAuthorRequest,
    ): Promise<void> {
        return this.commandBus.execute(req.toCommand(id));
    }

    @Delete(':id')
    async deleteAuthor(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteAuthorCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}

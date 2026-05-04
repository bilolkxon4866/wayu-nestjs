import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUsefulLinkRequest } from './commands/create-useful-link/create-useful-link.request';
import { CreateUsefulLinkResponse } from './commands/create-useful-link/create-useful-link.response';
import { UpdateUsefulLinkRequest } from './commands/update-useful-link/update-useful-link.request';
import { DeleteUsefulLinkCommand } from './commands/delete-useful-link/delete-useful-link.command';
import { GetAllUsefulLinkFilters } from './queries/get-all-useful-link/get-all-useful-link.filters';
import { GetAllUsefulLinkQuery } from './queries/get-all-useful-link/get-all-useful-link.query';
import { GetAllUsefulLinkResponse } from './queries/get-all-useful-link/get-all-useful-link.response';
import { GetOneUsefulLinkQuery } from './queries/get-one-useful-link/get-one-useful-link.query';
import { GetOneUsefulLinkResponse } from './queries/get-one-useful-link/get-one-useful-link.response';

@ApiTags('UsefulLink')
@Controller('admin/useful-links')
export class UsefulLinkController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllUsefulLinkResponse] })
    async getAllUsefulLink(@Query() filters: GetAllUsefulLinkFilters): Promise<GetAllUsefulLinkResponse[]> {
        return this.queryBus.execute(new GetAllUsefulLinkQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetOneUsefulLinkResponse })
    async getOneUsefulLink(@Param('id', ParseIntPipe) id: number): Promise<GetOneUsefulLinkResponse> {
        return this.queryBus.execute(new GetOneUsefulLinkQuery(id));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateUsefulLinkResponse })
    async createUsefulLink(@Body() req: CreateUsefulLinkRequest): Promise<CreateUsefulLinkResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    async updateUsefulLink(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateUsefulLinkRequest,
    ): Promise<void> {
        return this.commandBus.execute(req.toCommand(id));
    }

    @Delete(':id')
    async deleteUsefulLink(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteUsefulLinkCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}

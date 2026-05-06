import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateSocialLinksRequest } from './commands/create-social-links/create-social-links.request';
import { CreateSocialLinksResponse } from './commands/create-social-links/create-social-links.response';
import { UpdateSocialLinksRequest } from './commands/update-social-links/update-social-links.request';
import { DeleteSocialLinksCommand } from './commands/delete-social-links/delete-social-links.command';
import { GetAllSocialLinksFilters } from './queries/get-all-social-links/get-all-social-links.filters';
import { GetAllSocialLinksQuery } from './queries/get-all-social-links/get-all-social-links.query';
import { GetAllSocialLinksResponse } from './queries/get-all-social-links/get-all-social-links.response';
import { GetOneSocialLinksQuery } from './queries/get-one-social-links/get-one-social-links.query';
import { GetOneSocialLinksResponse } from './queries/get-one-social-links/get-one-social-links.response';

@ApiTags('SocialLinks')
@Controller('login/social-links')
export class SocialLinksController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllSocialLinksResponse] })
    async getAllSocialLinks(@Query() filters: GetAllSocialLinksFilters): Promise<GetAllSocialLinksResponse[]> {
        return this.queryBus.execute(new GetAllSocialLinksQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetOneSocialLinksResponse })
    async getOneSocialLinks(@Param('id', ParseIntPipe) id: number): Promise<GetOneSocialLinksResponse> {
        return this.queryBus.execute(new GetOneSocialLinksQuery(id));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateSocialLinksResponse })
    async createSocialLinks(@Body() req: CreateSocialLinksRequest): Promise<CreateSocialLinksResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    async updateSocialLinks(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateSocialLinksRequest,
    ): Promise<void> {
        return this.commandBus.execute(req.toCommand(id));
    }

    @Delete(':id')
    async deleteSocialLinks(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteSocialLinksCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}

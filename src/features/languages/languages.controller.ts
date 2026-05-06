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

import { CreateLanguageRequest } from './commands/create-language/create-language.request';
import { CreateLanguageResponse } from './commands/create-language/create-language.response';

import { UpdateLanguageRequest } from './commands/update-language/update-language.request';
import { DeleteLanguageCommand } from './commands/delete-language/delete-language.command';

import { GetAllLanguagesFilters } from './queries/get-all-languages/get-all-languages.filters';
import { GetAllLanguagesQuery } from './queries/get-all-languages/get-all-languages.query';
import { GetAllLanguagesResponse } from './queries/get-all-languages/get-all-languages.response';

import { GetLanguageByIdQuery } from './queries/get-language-by-id/get-language-by-id.query';
import { GetLanguageByIdResponse } from './queries/get-language-by-id/get-language-by-id.response';

@ApiTags('Languages')
@Controller('login/languages')
export class LanguagesController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllLanguagesResponse] })
    async getAllLanguages(@Query() filters: GetAllLanguagesFilters): Promise<GetAllLanguagesResponse[]> {
        return this.queryBus.execute(new GetAllLanguagesQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetLanguageByIdResponse })
    async getLanguageById(@Param('id', ParseIntPipe) id: number): Promise<GetLanguageByIdResponse> {
        return this.queryBus.execute(new GetLanguageByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateLanguageResponse })
    async createLanguage(@Body() req: CreateLanguageRequest): Promise<CreateLanguageResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    @ApiNoContentResponse()
    async updateLanguage(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateLanguageRequest,
    ): Promise<void> {
        return this.commandBus.execute(req.toCommand(id));
    }

    @Delete(':id')
    @ApiNoContentResponse()
    async deleteLanguage(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteLanguageCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}

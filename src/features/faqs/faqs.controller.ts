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

import { CreateFaqRequest } from './commands/create-faq/create-faq.request';
import { CreateFaqResponse } from './commands/create-faq/create-faq.response';

import { UpdateFaqRequest } from './commands/update-faq/update-faq.request';
import { DeleteFaqCommand } from './commands/delete-faq/delete-faq.command';

import { GetAllFaqsFilters } from './queries/get-all-faqs/get-all-faqs.filters';
import { GetAllFaqsQuery } from './queries/get-all-faqs/get-all-faqs.query';
import { GetAllFaqsResponse } from './queries/get-all-faqs/get-all-faqs.response';

import { GetFaqByIdQuery } from './queries/get-faq-by-id/get-faq-by-id.query';
import { GetFaqByIdResponse } from './queries/get-faq-by-id/get-faq-by-id.response';

@ApiTags('FAQs')
@Controller('admin/faqs')
export class FaqsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllFaqsResponse] })
    async getAllFaqs(@Query() filters: GetAllFaqsFilters): Promise<GetAllFaqsResponse[]> {
        return this.queryBus.execute(new GetAllFaqsQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetFaqByIdResponse })
    async getFaqById(@Param('id', ParseIntPipe) id: number): Promise<GetFaqByIdResponse> {
        return this.queryBus.execute(new GetFaqByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateFaqResponse })
    async createFaq(@Body() req: CreateFaqRequest): Promise<CreateFaqResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    @ApiNoContentResponse()
    async updateFaq(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateFaqRequest,
    ): Promise<void> {
        return this.commandBus.execute(req.toCommand(id));
    }

    @Delete(':id')
    @ApiNoContentResponse()
    async deleteFaq(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteFaqCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}

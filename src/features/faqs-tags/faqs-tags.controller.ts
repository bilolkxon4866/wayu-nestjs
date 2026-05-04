import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';

import { CreateFaqsTagRequest } from './commands/create-faqs-tag/create-faqs-tag.request';
import { CreateFaqsTagResponse } from './commands/create-faqs-tag/create-faqs-tag.response';
import { DeleteFaqsTagCommand } from './commands/delete-faqs-tag/delete-faqs-tag.command';

@ApiTags('Faqs Tags')
@Controller('admin/faqs-tags')
export class FaqsTagsController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post()
    @ApiCreatedResponse({ type: CreateFaqsTagResponse })
    async createFaqsTag(@Body() req: CreateFaqsTagRequest): Promise<CreateFaqsTagResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Delete(':id')
    @ApiNoContentResponse()
    async deleteFaqsTag(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteFaqsTagCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe, Patch,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateEventCategoryRequest } from './commands/create-event-category/create-event-category.request';
import { CreateEventCategoryResponse } from './commands/create-event-category/create-event-category.response';

import { UpdateEventCategoryRequest } from './commands/update-event-category/update-event-category.request';
import { DeleteEventCategoryCommand } from './commands/delete-event-category/delete-event-category.command';

import { GetAllEventCategoriesFilters } from './queries/get-all-event-categories/get-all-event-categories.filters';
import { GetAllEventCategoriesQuery } from './queries/get-all-event-categories/get-all-event-categories.query';
import { GetAllEventCategoriesResponse } from './queries/get-all-event-categories/get-all-event-categories.response';

import { GetEventCategoryByIdQuery } from './queries/get-event-category-by-id/get-event-category-by-id.query';
import { GetEventCategoryByIdResponse } from './queries/get-event-category-by-id/get-event-category-by-id.response';

@ApiTags('Event Categories')
@Controller('admin/event-categories')
export class EventCategoriesController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllEventCategoriesResponse] })
    async getAllEventCategories(@Query() filters: GetAllEventCategoriesFilters): Promise<GetAllEventCategoriesResponse[]> {
        return this.queryBus.execute(new GetAllEventCategoriesQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetEventCategoryByIdResponse })
    async getEventCategoryById(@Param('id', ParseIntPipe) id: number): Promise<GetEventCategoryByIdResponse> {
        return this.queryBus.execute(new GetEventCategoryByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateEventCategoryResponse })
    async createEventCategory(@Body() req: CreateEventCategoryRequest): Promise<CreateEventCategoryResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    @ApiNoContentResponse()
    async updateEventCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateEventCategoryRequest,
    ): Promise<void> {
        return this.commandBus.execute(req.toCommand(id));
    }

    @Delete(':id')
    @ApiNoContentResponse()
    async deleteEventCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteEventCategoryCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}

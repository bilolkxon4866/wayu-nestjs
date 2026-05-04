import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateEventRequest } from './commands/create-event/create-event.request';
import { CreateEventResponse } from './commands/create-event/create-event.response';
import { UpdateEventRequest } from './commands/update-event/update-event.request';
import { DeleteEventCommand } from './commands/delete-event/delete-event.command';
import { GetAllEventFilters } from './queries/get-all-event/get-all-event.filters';
import { GetAllEventQuery } from './queries/get-all-event/get-all-event.query';
import { GetAllEventResponse } from './queries/get-all-event/get-all-event.response';
import { GetOneEventQuery } from './queries/get-one-event/get-one-event.query';
import { GetOneEventResponse } from './queries/get-one-event/get-one-event.response';

@ApiTags('Event')
@Controller('admin/events')
export class EventController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllEventResponse] })
    async getAllEvent(@Query() filters: GetAllEventFilters): Promise<GetAllEventResponse[]> {
        return this.queryBus.execute(new GetAllEventQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetOneEventResponse })
    async getOneEvent(@Param('id', ParseIntPipe) id: number): Promise<GetOneEventResponse> {
        return this.queryBus.execute(new GetOneEventQuery(id));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateEventResponse })
    async createEvent(@Body() req: CreateEventRequest): Promise<CreateEventResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    async updateEvent(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateEventRequest,
    ): Promise<void> {
        return this.commandBus.execute(req.toCommand(id));
    }

    @Delete(':id')
    async deleteEvent(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteEventCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}

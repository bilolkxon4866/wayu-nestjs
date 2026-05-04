import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateVacanciesRequest } from './commands/create-vacancies/create-vacancies.request';
import { CreateVacanciesResponse } from './commands/create-vacancies/create-vacancies.response';
import { UpdateVacanciesRequest } from './commands/update-vacancies/update-vacancies.request';
import { DeleteVacanciesCommand } from './commands/delete-vacancies/delete-vacancies.command';
import { GetAllVacanciesFilters } from './queries/get-all-vacancies/get-all-vacancies.filters';
import { GetAllVacanciesQuery } from './queries/get-all-vacancies/get-all-vacancies.query';
import { GetAllVacanciesResponse } from './queries/get-all-vacancies/get-all-vacancies.response';
import { GetOneVacanciesQuery } from './queries/get-one-vacancies/get-one-vacancies.query';
import { GetOneVacanciesResponse } from './queries/get-one-vacancies/get-one-vacancies.response';

@ApiTags('Vacancies')
@Controller('admin/vacancies')
export class VacanciesController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllVacanciesResponse] })
    async getAllVacancies(@Query() filters: GetAllVacanciesFilters): Promise<GetAllVacanciesResponse[]> {
        return this.queryBus.execute(new GetAllVacanciesQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetOneVacanciesResponse })
    async getOneVacancies(@Param('id', ParseIntPipe) id: number): Promise<GetOneVacanciesResponse> {
        return this.queryBus.execute(new GetOneVacanciesQuery(id));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateVacanciesResponse })
    async createVacancies(@Body() req: CreateVacanciesRequest): Promise<CreateVacanciesResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    async updateVacancies(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateVacanciesRequest,
    ): Promise<void> {
        return this.commandBus.execute(req.toCommand(id));
    }

    @Delete(':id')
    async deleteVacancies(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteVacanciesCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}

// import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
// import { CommandBus, QueryBus } from '@nestjs/cqrs';
// import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
// import { CreateCountriesRequest } from './commands/create-countries/create-countries.request';
// import { CreateCountriesResponse } from './commands/create-countries/create-countries.response';
// import { UpdateCountriesRequest } from './commands/update-countries/update-countries.request';
// import { DeleteCountriesCommand } from './commands/delete-countries/delete-countries.command';
// import { GetAllCountriesFilters } from './queries/get-all-countries/get-all-countries.filters';
// import { GetAllCountriesQuery } from './queries/get-all-countries/get-all-countries.query';
// import { GetOneCountriesResponse } from './queries/get-one-countrie/get-one-countries.response';
// import {GetOneCountriesQuery} from "./queries/get-one-countrie/get-one-countries.query";
// import {GetAllCountriesResponse} from "./queries/get-all-countries/get-all-countries.response";
//
// @ApiTags('Countries')
// @Controller('admin/countries')
// export class CountriesController {
//     constructor(
//         private readonly commandBus: CommandBus,
//         private readonly queryBus: QueryBus,
//     ) {}
//
//     @Get()
//     @ApiOkResponse({ type: [GetAllCountriesResponse] })
//     async getAllCountries(@Query() filters: GetAllCountriesFilters): Promise<GetAllCountriesResponse[]> {
//         return this.queryBus.execute(new GetAllCountriesQuery(filters));
//     }
//
//     @Get(':id')
//     @ApiOkResponse({ type: GetOneCountriesResponse })
//     async getOneCountry(@Param('id', ParseIntPipe) id: number): Promise<GetOneCountriesResponse> {
//         return this.queryBus.execute(new GetOneCountriesQuery(id));
//     }
//
//     @Post()
//     @ApiCreatedResponse({ type: CreateCountriesResponse })
//     async createCountry(@Body() req: CreateCountriesRequest): Promise<CreateCountriesResponse> {
//         return this.commandBus.execute(req.toCommand());
//     }
//
//     @Patch(':id')
//     async updateCountry(
//         @Param('id', ParseIntPipe) id: number,
//         @Body() req: UpdateCountriesRequest,
//     ): Promise<void> {
//         return this.commandBus.execute(req.toCommand(id));
//     }
//
//     @Delete(':id')
//     async deleteCountry(@Param('id', ParseIntPipe) id: number): Promise<void> {
//         const cmd = new DeleteCountriesCommand();
//         cmd.id = id;
//         return this.commandBus.execute(cmd);
//     }
// }








import {
    Body, Controller, Delete, Get,
    Param, ParseIntPipe, Post, Patch,
    Query, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express'
import { GetAllCountriesFilters } from './queries/get-all-countries/get-all-countries.filters';
import { GetAllCountriesQuery } from './queries/get-all-countries/get-all-countries.query';
import { GetAllCountriesResponse } from './queries/get-all-countries/get-all-countries.response'
import {GetOneCountriesResponse} from "./queries/get-one-countrie/get-one-countries.response";
import {storageOptions} from "../../configs/multer.config";
import {GetOneCountriesQuery} from "./queries/get-one-countrie/get-one-countries.query";
import {CreateCountriesResponse} from "./commands/create-countries/create-countries.response";
import {CreateCountriesRequest} from "./commands/create-countries/create-countries.request";
import {UpdateCountriesRequest} from "./commands/update-countries/update-countries.request";
import {DeleteCountriesCommand} from "./commands/delete-countries/delete-countries.command";
@ApiTags('Countries')
@Controller('admin/countries')
export class CountriesController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllCountriesResponse] })
    async getAllCountries(@Query() filters: GetAllCountriesFilters): Promise<GetAllCountriesResponse[]> {
        return this.queryBus.execute(new GetAllCountriesQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetOneCountriesResponse })
    async getCountryById(@Param('id', ParseIntPipe) id: number): Promise<GetOneCountriesResponse> {
        return this.queryBus.execute(new GetOneCountriesQuery(id));
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiCreatedResponse({ type: CreateCountriesResponse })
    @UseInterceptors(FileInterceptor('flag', { storage: storageOptions }))
    async createCountry(
        @Body() req: CreateCountriesRequest,
        @UploadedFile() flag: Express.Multer.File,
    ): Promise<CreateCountriesResponse> {
        const cmd = req.toCommand();
        cmd.flag = flag.filename;
        return this.commandBus.execute(cmd);
    }

    @Patch(':id')
    @ApiConsumes('multipart/form-data')
    @ApiNoContentResponse()
    @UseInterceptors(FileInterceptor('flag', { storage: storageOptions }))
    async updateCountry(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateCountriesRequest,
        @UploadedFile() flag?: Express.Multer.File,
    ): Promise<void> {
        const cmd = req.toCommand(id);
        if (flag) cmd.flag = flag.filename;
        return this.commandBus.execute(cmd);
    }

    @Delete(':id')
    @ApiNoContentResponse()
    async deleteCountry(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteCountriesCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}
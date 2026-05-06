import {Body, Controller, Get, Patch, Put} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UpdateStaticInfoRequest } from './commands/update-static-info/update-static-info.request';
import { GetStaticInfoQuery } from './queries/get-static-info/get-static-info.query';
import { GetStaticInfoResponse } from './queries/get-static-info/get-static-info.response';

@ApiTags('Static Info')
@Controller('login/static-info')
export class StaticInfoController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: GetStaticInfoResponse })
    async getStaticInfo(): Promise<GetStaticInfoResponse> {
        return this.queryBus.execute(new GetStaticInfoQuery());
    }

    @Patch()
    @ApiNoContentResponse()
    async updateStaticInfo(@Body() req: UpdateStaticInfoRequest): Promise<void> {
        return this.commandBus.execute(req.toCommand());
    }
}

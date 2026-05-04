import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query,} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {CreateBranchResponse} from "./commands/create-branches/create-branch.response";
import {GetAllBranchResponse} from "./queries/get-all-branch/get-all-branch.response";
import {CreateBranchRequest} from "./commands/create-branches/create-branch-request";
import {UpdateBranchRequest} from "./commands/update-branches/update-branch.request";
import {DeleteBranchCommand} from "./commands/delete-branches/delete-branch.command";
import {GetOneBranchQuery} from "./queries/get-one-branch/get-one-branch.query";
import {GetBranchResponse} from "./queries/get-one-branch/get-one-branch.response";
import {GetAllBranchQuery} from "./queries/get-all-branch/get-all-branch.query";
import {GetAllBranchFilter} from "./queries/get-all-branch/get-all-branch.filter";



@ApiTags('Branches')
@Controller('admin/branches')
export class BranchesController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllBranchResponse] })
    async getAllBranches(@Query() filters: GetAllBranchFilter): Promise<GetAllBranchResponse[]> {
        return this.queryBus.execute(new GetAllBranchQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetBranchResponse })
    async getBranchById(@Param('id', ParseIntPipe) id: number): Promise<GetBranchResponse> {
        return this.queryBus.execute(new GetOneBranchQuery(id));
    }

    @Post()
    @ApiCreatedResponse({ type: CreateBranchResponse })
    async createBranch(@Body() req: CreateBranchRequest): Promise<CreateBranchResponse> {
        return this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    async updateBranch(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateBranchRequest): Promise<void> {
        return this.commandBus.execute(req.toCommand(id));
    }

    @Delete(':id')
    async deleteBranch(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteBranchCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}
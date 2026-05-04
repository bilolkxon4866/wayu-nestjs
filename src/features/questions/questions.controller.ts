import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Put,
    Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UpdateQuestionStatusRequest } from './commands/update-question-status/update-question-status.request';
import { DeleteQuestionCommand } from './commands/delete-question/delete-question.command';

import { GetAllQuestionsFilters } from './queries/get-all-questions/get-all-questions.filters';
import { GetAllQuestionsQuery } from './queries/get-all-questions/get-all-questions.query';
import { GetAllQuestionsResponse } from './queries/get-all-questions/get-all-questions.response';

import { GetQuestionByIdQuery } from './queries/get-question-by-id/get-question-by-id.query';
import { GetQuestionByIdResponse } from './queries/get-question-by-id/get-question-by-id.response';

@ApiTags('Questions')
@Controller('admin/questions')
export class QuestionsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({ type: [GetAllQuestionsResponse] })
    async getAllQuestions(@Query() filters: GetAllQuestionsFilters): Promise<GetAllQuestionsResponse[]> {
        return this.queryBus.execute(new GetAllQuestionsQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({ type: GetQuestionByIdResponse })
    async getQuestionById(@Param('id', ParseIntPipe) id: number): Promise<GetQuestionByIdResponse> {
        return this.queryBus.execute(new GetQuestionByIdQuery(id));
    }

    @Put(':id/status')
    @ApiNoContentResponse()
    async updateQuestionStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateQuestionStatusRequest,
    ): Promise<void> {
        return this.commandBus.execute(req.toCommand(id));
    }

    @Delete(':id')
    @ApiNoContentResponse()
    async deleteQuestion(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const cmd = new DeleteQuestionCommand();
        cmd.id = id;
        return this.commandBus.execute(cmd);
    }
}

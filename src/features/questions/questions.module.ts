import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { QuestionsController } from './questions.controller';
import { UpdateQuestionStatusHandler } from './commands/update-question-status/update-question-status.handler';
import { DeleteQuestionHandler } from './commands/delete-question/delete-question.handler';
import { GetAllQuestionsHandler } from './queries/get-all-questions/get-all-questions.handler';
import { GetQuestionByIdHandler } from './queries/get-question-by-id/get-question-by-id.handler';

@Module({
    imports: [CqrsModule],
    controllers: [QuestionsController],
    providers: [
        UpdateQuestionStatusHandler,
        DeleteQuestionHandler,
        GetAllQuestionsHandler,
        GetQuestionByIdHandler,
    ],
})
export class QuestionsModule {}

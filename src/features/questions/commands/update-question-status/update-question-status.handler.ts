import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { UpdateQuestionStatusCommand } from './update-question-status.command';
import {QuestionsEntity} from "../../questions.entity";

@CommandHandler(UpdateQuestionStatusCommand)
export class UpdateQuestionStatusHandler implements ICommandHandler<UpdateQuestionStatusCommand> {
    async execute(cmd: UpdateQuestionStatusCommand): Promise<void> {
        const question = await QuestionsEntity.findOneBy({ id: cmd.id });
        if (!question) {
            throw new NotFoundException('Berilgan id boyicha savol topilmadi');
        }

        question.status = cmd.status;
        await QuestionsEntity.save(question);
    }
}

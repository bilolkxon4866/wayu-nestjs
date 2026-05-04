import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteQuestionCommand } from './delete-question.command';
import {QuestionsEntity} from "../../questions.entity";

@CommandHandler(DeleteQuestionCommand)
export class DeleteQuestionHandler implements ICommandHandler<DeleteQuestionCommand> {
    async execute(cmd: DeleteQuestionCommand): Promise<void> {
        const question = await QuestionsEntity.findOneBy({ id: cmd.id });
        if (!question) {
            throw new NotFoundException('Berilgan id boyicha savol topilmadi');
        }

        await QuestionsEntity.remove(question);
    }
}

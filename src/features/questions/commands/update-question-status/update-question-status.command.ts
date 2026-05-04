import { Command } from '@nestjs/cqrs';
import {QuestionStatus} from "../../../../core/enum/enum";

export class UpdateQuestionStatusCommand extends Command<void> {
    id!: number;
    status!: QuestionStatus;
}

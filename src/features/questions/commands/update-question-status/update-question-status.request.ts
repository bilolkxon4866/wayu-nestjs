import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateQuestionStatusCommand } from './update-question-status.command';
import {QuestionStatus} from "../../../../core/enum/enum";

export class UpdateQuestionStatusRequest {
    @IsEnum(QuestionStatus)
    @ApiProperty({ enum: QuestionStatus, example: QuestionStatus.ANSWERED })
    status!: QuestionStatus;

    public toCommand(id: number): UpdateQuestionStatusCommand {
        const cmd = new UpdateQuestionStatusCommand();
        cmd.id = id;
        cmd.status = this.status;
        return cmd;
    }
}

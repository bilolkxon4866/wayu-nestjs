import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {QuestionStatus} from "../../../../core/enum/enum";

export class GetAllQuestionsResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    fullName!: string;

    @Expose()
    @ApiProperty()
    phoneNumber!: string;

    @Expose()
    @ApiProperty()
    question!: string;

    @Expose()
    @ApiProperty({ enum: QuestionStatus })
    status!: QuestionStatus;

    @Expose()
    @ApiProperty()
    createdAt!: string;
}

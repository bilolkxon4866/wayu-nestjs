import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {QuestionStatus} from "../../../../core/enum/enum";

export class GetAllQuestionsFilters {
    @IsInt()
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    @ApiProperty({ required: false })
    page?: number;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(100)
    @Type(() => Number)
    @ApiProperty({ required: false })
    size?: number;

    @IsEnum(QuestionStatus)
    @IsOptional()
    @ApiProperty({ required: false })
    status?: QuestionStatus;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    search?: string;
}

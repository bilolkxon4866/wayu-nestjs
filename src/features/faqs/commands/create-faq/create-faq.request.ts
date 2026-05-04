import { ArrayUnique, IsArray, IsInt, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateFaqCommand } from './create-faq.command';

export class CreateFaqRequest {
    @IsString()
    @MinLength(5)
    @MaxLength(256)
    @ApiProperty()
    question!: string;

    @IsString()
    @MinLength(5)
    @MaxLength(512)
    @ApiProperty()
    answer!: string;

    @IsArray()
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiProperty({ required: false })
    tagIds?: number[];

    public toCommand(): CreateFaqCommand {
        const cmd = new CreateFaqCommand();
        cmd.question = this.question;
        cmd.answer = this.answer;
        cmd.tagIds = this.tagIds;
        return cmd;
    }
}

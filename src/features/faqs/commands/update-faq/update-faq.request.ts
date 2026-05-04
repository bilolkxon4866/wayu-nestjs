import { ArrayUnique, IsArray, IsInt, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UpdateFaqCommand } from './update-faq.command';

export class UpdateFaqRequest {
    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(256)
    @ApiProperty({ required: false, example: 'Yangilangan savol matni?' })
    question?: string;

    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(512)
    @ApiProperty({ required: false, example: 'Yangilangan javob matni.' })
    answer?: string;

    @IsArray()
    @IsOptional()
    @IsInt({ each: true })
    @ArrayUnique()
    @Type(() => Number)
    @ApiProperty({ required: false, example: [1, 3], description: 'Yangi tag IDlari (to\'liq almashtiradi)' })
    tagIds?: number[];

    public toCommand(id: number): UpdateFaqCommand {
        const cmd = new UpdateFaqCommand();
        cmd.id = id;
        cmd.question = this.question;
        cmd.answer = this.answer;
        cmd.tagIds = this.tagIds;
        return cmd;
    }
}

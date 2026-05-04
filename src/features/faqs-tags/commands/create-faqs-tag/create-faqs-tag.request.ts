import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateFaqsTagCommand } from './create-faqs-tag.command';

export class CreateFaqsTagRequest {
    @IsInt()
    @Type(() => Number)
    @ApiProperty({ example: 1 })
    faqsId!: number;

    @IsInt()
    @Type(() => Number)
    @ApiProperty({ example: 2 })
    tagId!: number;

    public toCommand(): CreateFaqsTagCommand {
        const cmd = new CreateFaqsTagCommand();
        cmd.faqsId = this.faqsId;
        cmd.tagId = this.tagId;
        return cmd;
    }
}

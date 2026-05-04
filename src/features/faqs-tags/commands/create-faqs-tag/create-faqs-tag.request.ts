import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateFaqsTagCommand } from './create-faqs-tag.command';

export class CreateFaqsTagRequest {
    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    faqsId!: number;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    tagId!: number;

    public toCommand(): CreateFaqsTagCommand {
        const cmd = new CreateFaqsTagCommand();
        cmd.faqsId = this.faqsId;
        cmd.tagId = this.tagId;
        return cmd;
    }
}

import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateNewsTagCommand } from './create-news-tag.command';

export class CreateNewsTagRequest {
    @IsInt()
    @Type(() => Number)
    @ApiProperty({ example: 1 })
    newsId!: number;

    @IsInt()
    @Type(() => Number)
    @ApiProperty({ example: 2 })
    tagId!: number;

    public toCommand(): CreateNewsTagCommand {
        const cmd = new CreateNewsTagCommand();
        cmd.newsId = this.newsId;
        cmd.tagId = this.tagId;
        return cmd;
    }
}

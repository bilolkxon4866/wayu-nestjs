import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateNewsCategoryCommand } from './update-news-category.command';

export class UpdateNewsCategoryRequest {
    @IsString()
    @MinLength(2)
    @MaxLength(64)
    @ApiProperty({ example: 'Iqtisodiyot' })
    title!: string;

    public toCommand(id: number): UpdateNewsCategoryCommand {
        const cmd = new UpdateNewsCategoryCommand();
        cmd.id = id;
        cmd.title = this.title;
        return cmd;
    }
}

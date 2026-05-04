import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateNewsCategoryCommand } from './create-news-category.command';

export class CreateNewsCategoryRequest {
    @IsString()
    @MinLength(2)
    @MaxLength(64)
    @ApiProperty()
    title!: string;

    public toCommand(): CreateNewsCategoryCommand {
        const cmd = new CreateNewsCategoryCommand();
        cmd.title = this.title;
        return cmd;
    }
}

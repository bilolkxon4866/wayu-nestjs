import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateBookCategoryCommand } from './create-book-category.command';

export class CreateBookCategoryRequest {
    @IsString()
    @MinLength(3)
    @ApiProperty()
    title!: string;

    public toCommand(): CreateBookCategoryCommand {
        const cmd = new CreateBookCategoryCommand();
        cmd.title = this.title;
        return cmd;
    }
}

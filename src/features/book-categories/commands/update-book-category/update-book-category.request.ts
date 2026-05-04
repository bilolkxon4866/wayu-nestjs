import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UpdateBookCategoryCommand } from './update-book-category.command';

export class UpdateBookCategoryRequest {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @ApiPropertyOptional()
    title?: string;

    public toCommand(id: number): UpdateBookCategoryCommand {
        const cmd = new UpdateBookCategoryCommand();
        cmd.id = id;
        cmd.title = this.title;
        return cmd;
    }
}

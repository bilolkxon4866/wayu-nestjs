import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateEventCategoryCommand } from './update-event-category.command';

export class UpdateEventCategoryRequest {
    @IsString()
    @MinLength(2)
    @MaxLength(64)
    @ApiProperty({ example: 'Seminar' })
    title!: string;

    public toCommand(id: number): UpdateEventCategoryCommand {
        const cmd = new UpdateEventCategoryCommand();
        cmd.id = id;
        cmd.title = this.title;
        return cmd;
    }
}

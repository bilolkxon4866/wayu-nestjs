import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateEventCategoryCommand } from './create-event-category.command';

export class CreateEventCategoryRequest {
    @IsString()
    @MinLength(2)
    @MaxLength(64)
    @ApiProperty()
    title!: string;

    public toCommand(): CreateEventCategoryCommand {
        const cmd = new CreateEventCategoryCommand();
        cmd.title = this.title;
        return cmd;
    }
}

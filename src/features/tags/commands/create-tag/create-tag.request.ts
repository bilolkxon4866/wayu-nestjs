import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTagCommand } from './create-tag.command';

export class CreateTagRequest {
    @IsString()
    @MinLength(2)
    @MaxLength(64)
    @ApiProperty({ example: 'Siyosat' })
    title!: string;

    public toCommand(): CreateTagCommand {
        const cmd = new CreateTagCommand();
        cmd.title = this.title;
        return cmd;
    }
}

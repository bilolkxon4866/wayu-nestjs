import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateTagCommand } from './update-tag.command';

export class UpdateTagRequest {
    @IsString()
    @MinLength(2)
    @MaxLength(64)
    @ApiProperty({ example: 'Iqtisodiyot' })
    title!: string;

    public toCommand(id: number): UpdateTagCommand {
        const cmd = new UpdateTagCommand();
        cmd.id = id;
        cmd.title = this.title;
        return cmd;
    }
}

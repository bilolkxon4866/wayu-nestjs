import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateAuthorCommand } from './update-author.command';

export class UpdateAuthorRequest {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @ApiProperty({ required: true })
    fullName?: string | undefined;


    public toCommand(id: number): UpdateAuthorCommand {
        const cmd = new UpdateAuthorCommand();
        cmd.id = id;
        if (this.fullName !== undefined) cmd.fullName = this.fullName;
        return cmd;
    }
}

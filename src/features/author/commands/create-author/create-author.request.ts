import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAuthorCommand } from './create-author.command';

export class CreateAuthorRequest {
    @IsString()
    @MinLength(3)
    @ApiProperty({ required: false })
    fullName!: string;


    public toCommand(): CreateAuthorCommand {
        const cmd = new CreateAuthorCommand();
        cmd.fullName = this.fullName;
        return cmd;
    }
}

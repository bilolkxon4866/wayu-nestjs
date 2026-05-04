import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateLanguageCommand } from './create-language.command';

export class CreateLanguageRequest {
    @IsString()
    @MinLength(2)
    @MaxLength(64)
    @ApiProperty({ example: "O'zbek" })
    title!: string;

    public toCommand(): CreateLanguageCommand {
        const cmd = new CreateLanguageCommand();
        cmd.title = this.title;
        return cmd;
    }
}

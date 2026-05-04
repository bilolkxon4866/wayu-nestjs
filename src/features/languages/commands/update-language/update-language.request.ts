import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateLanguageCommand } from './update-language.command';

export class UpdateLanguageRequest {
    @IsString()
    @MinLength(2)
    @MaxLength(64)
    @ApiProperty({ example: 'Rus tili' })
    title!: string;

    public toCommand(id: number): UpdateLanguageCommand {
        const cmd = new UpdateLanguageCommand();
        cmd.id = id;
        cmd.title = this.title;
        return cmd;
    }
}

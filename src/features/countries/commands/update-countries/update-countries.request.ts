import { IsOptional, IsString, IsUrl, Length, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateCountriesCommand } from './update-countries.command';

export class UpdateCountriesRequest {
    @IsString()
    @IsOptional()
    @MinLength(6)
    @MaxLength(64)
    @ApiProperty({ required: false })
    title?: string;

    @IsUrl()
    @IsOptional()
    @MaxLength(64)
    @ApiProperty({ required: false })
    flag?: string;

    public toCommand(id: number): UpdateCountriesCommand {
        const cmd = new UpdateCountriesCommand();
        cmd.id = id;
        cmd.title = this.title;
        cmd.flag = this.flag;
        return cmd;
    }
}

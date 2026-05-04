import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUsefulLinkCommand } from './create-useful-link.command';

export class CreateUsefulLinkRequest {
    @IsString()
    @MinLength(1)
    @ApiProperty({ required: false })
    title!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty({ required: false })
    icon!: string;

    @IsUrl()
    @MaxLength(128)
    @ApiProperty({ required: false })
    link!: string;


    public toCommand(): CreateUsefulLinkCommand {
        const cmd = new CreateUsefulLinkCommand();
        cmd.title = this.title;
        cmd.icon = this.icon;
        cmd.link = this.link;
        return cmd;
    }
}

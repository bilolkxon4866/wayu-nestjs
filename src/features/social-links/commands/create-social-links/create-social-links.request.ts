import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSocialLinksCommand } from './create-social-links.command';

export class CreateSocialLinksRequest {
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


    public toCommand(): CreateSocialLinksCommand {
        const cmd = new CreateSocialLinksCommand();
        cmd.title = this.title;
        cmd.icon = this.icon;
        cmd.link = this.link;
        return cmd;
    }
}

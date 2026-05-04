import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateSocialLinksCommand } from './update-social-links.command';

export class UpdateSocialLinksRequest {
    @IsOptional()
    @IsString()
    @MinLength(1)
    @ApiProperty({ required: true })
    title?: string | undefined;

    @IsOptional()
    @IsString()
    @MaxLength(128)
    @ApiProperty({ required: true })
    icon?: string | undefined;

    @IsOptional()
    @IsUrl()
    @MaxLength(128)
    @ApiProperty({ required: true })
    link?: string | undefined;


    public toCommand(id: number): UpdateSocialLinksCommand {
        const cmd = new UpdateSocialLinksCommand();
        cmd.id = id;
        if (this.title !== undefined) cmd.title = this.title;
        if (this.icon !== undefined) cmd.icon = this.icon;
        if (this.link !== undefined) cmd.link = this.link;
        return cmd;
    }
}

import { IsOptional, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateInstagramPostCommand } from './update-instagram-post.command';

export class UpdateInstagramPostRequest {
    @IsUrl()
    @IsOptional()
    @MaxLength(256)
    @ApiProperty({ required: false, example: 'https://example.com/new-image.jpg' })
    image?: string;

    @IsUrl()
    @IsOptional()
    @MaxLength(128)
    @ApiProperty({ required: false, example: 'https://www.instagram.com/p/xyz789' })
    link?: string;

    public toCommand(id: number): UpdateInstagramPostCommand {
        const cmd = new UpdateInstagramPostCommand();
        cmd.id = id;
        cmd.image = this.image;
        cmd.link = this.link;
        return cmd;
    }
}

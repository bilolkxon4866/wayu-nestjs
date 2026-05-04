import { IsString, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateInstagramPostCommand } from './create-instagram-post.command';

export class CreateInstagramPostRequest {
    @IsUrl()
    @MaxLength(256)
    @ApiProperty({ example: 'https://example.com/image.jpg' })
    image!: string;

    @IsUrl()
    @MaxLength(128)
    @ApiProperty({ example: 'https://www.instagram.com/p/abc123' })
    link!: string;

    public toCommand(): CreateInstagramPostCommand {
        const cmd = new CreateInstagramPostCommand();
        cmd.image = this.image;
        cmd.link = this.link;
        return cmd;
    }
}

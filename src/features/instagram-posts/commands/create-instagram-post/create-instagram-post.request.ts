import {Allow, IsString, IsUrl, MaxLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateInstagramPostCommand } from './create-instagram-post.command';

export class CreateInstagramPostRequest {
    @Allow()
    @ApiProperty({ type: "string", format: "binary" })
    image!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    link!: string;

    public toCommand(): CreateInstagramPostCommand {
        const cmd = new CreateInstagramPostCommand();
        cmd.image = this.image;
        cmd.link = this.link;
        return cmd;
    }
}

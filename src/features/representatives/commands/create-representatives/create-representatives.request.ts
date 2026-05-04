import {Allow, IsEmail, IsString, IsUrl, MaxLength, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateRepresentativesCommand } from './create-representatives.command';

export class CreateRepresentativesRequest {
    @IsString()
    @MinLength(3)
    @ApiProperty()
    fullname!: string;

    @Allow()
    @ApiProperty({ type: "string", format: "binary" })
    image!: string;

    @IsEmail()
    @MaxLength(64)
    @ApiProperty()
    email!: string;

    @IsString()
    @MaxLength(16)
    @ApiProperty()
    phoneNumber!: string;

    @Allow()
    @ApiProperty({ type: "string", format: "binary" })
    resume!: string;


    public toCommand(): CreateRepresentativesCommand {
        const cmd = new CreateRepresentativesCommand();
        cmd.fullname = this.fullname;
        cmd.image = this.image;
        cmd.email = this.email;
        cmd.phoneNumber = this.phoneNumber;
        cmd.resume = this.resume;
        return cmd;
    }
}

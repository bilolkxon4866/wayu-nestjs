import { IsEmail, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateRepresentativesCommand } from './create-representatives.command';

export class CreateRepresentativesRequest {
    @IsString()
    @MinLength(3)
    @ApiProperty({ required: false })
    fullname!: string;

    @IsUrl()
    @MaxLength(128)
    @ApiProperty({ required: false })
    image!: string;

    @IsEmail()
    @MaxLength(64)
    @ApiProperty({ required: false })
    email!: string;

    @IsString()
    @MaxLength(16)
    @ApiProperty({ required: false })
    phoneNumber!: string;

    @IsString()
    @MinLength(10)
    @ApiProperty({ required: false })
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

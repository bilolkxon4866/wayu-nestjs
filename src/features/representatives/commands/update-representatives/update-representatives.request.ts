import { IsEmail, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateRepresentativesCommand } from './update-representatives.command';

export class UpdateRepresentativesRequest {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @ApiProperty({ required: true })
    fullname?: string

    @IsOptional()
    @IsUrl()
    @MaxLength(128)
    @ApiProperty({ required: false })
    image?: string

    @IsOptional()
    @IsEmail()
    @MaxLength(64)
    @ApiProperty({ required: false })
    email?: string

    @IsOptional()
    @IsString()
    @MaxLength(16)
    @ApiProperty({ required: false })
    phoneNumber?: string

    @IsOptional()
    @IsString()
    @MinLength(10)
    @ApiProperty({ required: false })
    resume?: string


    public toCommand(id: number): UpdateRepresentativesCommand {
        const cmd = new UpdateRepresentativesCommand();
        cmd.id = id;
        if (this.fullname !== undefined) cmd.fullname = this.fullname;
        if (this.image !== undefined) cmd.image = this.image;
        if (this.email !== undefined) cmd.email = this.email;
        if (this.phoneNumber !== undefined) cmd.phoneNumber = this.phoneNumber;
        if (this.resume !== undefined) cmd.resume = this.resume;
        return cmd;
    }
}

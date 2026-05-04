import { IsInt, IsNumberString, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateBranchCommand } from './create-branch.command';

export class CreateBranchRequest {
    @IsString()
    @MinLength(2)
    @MaxLength(64)
    @ApiProperty()
    city!: string;

    @IsNumberString()
    @ApiProperty()
    latitude!: number;

    @IsNumberString()
    @ApiProperty()
    longitude!: number;

    @IsString()
    @MaxLength(16)
    @ApiProperty()
    phoneNumber!: string;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    countryId!: number;

    @IsInt()
    @Type(() => Number)
    @ApiProperty({required: false})
    representativeId!: number;

    public toCommand(): CreateBranchCommand {
        const cmd = new CreateBranchCommand();
        cmd.city = this.city;
        cmd.latitude = this.latitude;
        cmd.longitude = this.longitude;
        cmd.phoneNumber = this.phoneNumber;
        cmd.countryId = this.countryId;
        cmd.representativeId = this.representativeId;
        return cmd;
    }
}
import { IsInt, IsNumberString, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateBranchCommand } from './create-branch.command';

export class CreateBranchRequest {
    @IsString()
    @MinLength(2)
    @MaxLength(64)
    @ApiProperty({ required: false })
    city!: string;

    @IsNumberString()
    @ApiProperty({ required: false })
    latitude!: number;

    @IsNumberString()
    @ApiProperty({ required: false })
    longitude!: number;

    @IsString()
    @MinLength(7)
    @MaxLength(16)
    @ApiProperty({ required: false })
    phoneNumber!: string;

    @IsInt()
    @Type(() => Number)
    @ApiProperty({ required: false })
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
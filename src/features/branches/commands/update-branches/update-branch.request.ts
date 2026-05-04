import { IsInt, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UpdateBranchCommand } from './update-branch.command';

export class UpdateBranchRequest {
    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(64)
    @ApiProperty({ required: false })
    city?: string;

    @IsNumberString()
    @IsOptional()
    @ApiProperty({ required: false })
    latitude?: number;

    @IsNumberString()
    @IsOptional()
    @ApiProperty({ required: false })
    longitude?: number;

    @IsString()
    @IsOptional()
    @MinLength(7)
    @MaxLength(16)
    @ApiProperty({ required: false })
    phoneNumber?: string;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ required: false })
    countryId?: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ required: false })
    representativeId?: number;

    public toCommand(id: number): UpdateBranchCommand {
        const cmd = new UpdateBranchCommand();
        cmd.id = id;
        cmd.city = this.city;
        cmd.latitude = this.latitude;
        cmd.longitude = this.longitude;
        cmd.phoneNumber = this.phoneNumber;
        cmd.countryId = this.countryId;
        cmd.representativeId = this.representativeId;
        return cmd;
    }
}
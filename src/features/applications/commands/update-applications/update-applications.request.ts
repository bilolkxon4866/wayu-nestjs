import { IsEmail, IsEnum, IsInt, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApplicationStatus } from '../../../../core/enum/enum';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateApplicationsCommand } from './update-applications.command';

export class UpdateApplicationsRequest {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @ApiProperty({ required: true })
    fullName?: string

    @IsOptional()
    @IsString()
    @MaxLength(16)
    @ApiProperty({ required: true })
    phoneNumber?: string

    @IsOptional()
    @IsEmail()
    @MaxLength(64)
    @ApiProperty({ required: true })
    email?: string

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiProperty({ required: true })
    vacancyId?: number

    @IsOptional()
    @IsString()
    @MaxLength(128)
    @ApiProperty({ required: true })
    resume?: string

    @IsOptional()
    @IsEnum(ApplicationStatus)
    @ApiProperty({ required: true })
    status?: ApplicationStatus


    public toCommand(id: number): UpdateApplicationsCommand {
        const cmd = new UpdateApplicationsCommand();
        cmd.id = id
        cmd.fullName = this.fullName
        cmd.phoneNumber = this.phoneNumber
        cmd.email = this.email
        cmd.vacancyId = this.vacancyId
        cmd.resume = this.resume
        cmd.status = this.status
        return cmd
    }
}

import { IsEmail, IsEnum, IsInt, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApplicationStatus } from '../../../../core/enum/enum';
import { ApiProperty } from '@nestjs/swagger';
import { CreateApplicationsCommand } from './create-applications.command';

export class CreateApplicationsRequest {
    @IsString()
    @MinLength(3)
    @ApiProperty({ required: false })
    fullName!: string;

    @IsString()
    @MaxLength(16)
    @ApiProperty({ required: false })
    phoneNumber!: string;

    @IsEmail()
    @MaxLength(64)
    @ApiProperty({ required: false })
    email!: string;

    @IsInt()
    @Type(() => Number)
    @ApiProperty({ required: false })
    vacancyId!: number;

    @IsString()
    @MaxLength(128)
    @ApiProperty({ required: false })
    resume!: string;

    @IsEnum(ApplicationStatus)
    @ApiProperty({ required: false })
    status!: ApplicationStatus;


    public toCommand(): CreateApplicationsCommand {
        const cmd = new CreateApplicationsCommand();
        cmd.fullName = this.fullName;
        cmd.phoneNumber = this.phoneNumber;
        cmd.email = this.email;
        cmd.vacancyId = this.vacancyId;
        cmd.resume = //resumeFilename;
        cmd.status = this.status;
        return cmd;
    }
}

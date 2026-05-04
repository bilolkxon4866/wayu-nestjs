import { IsEmail, IsEnum, IsInt, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApplicationStatus } from '../../../../core/enum/enum';
import { ApiProperty } from '@nestjs/swagger';
import { CreateApplicationsCommand } from './create-applications.command';

export class CreateApplicationsRequest {
    @IsString()
    @MinLength(3)
    @ApiProperty()
    fullName!: string;

    @IsString()
    @MaxLength(16)
    @ApiProperty()
    phoneNumber!: string;

    @IsEmail()
    @MaxLength(64)
    @ApiProperty()
    email!: string;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    vacancyId!: number;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    resume!: string;

    @IsEnum(ApplicationStatus)
    @ApiProperty()
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

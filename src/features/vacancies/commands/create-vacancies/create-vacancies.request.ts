import { IsBoolean, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { VacancyType } from '../../../../core/enum/enum';
import { ApiProperty } from '@nestjs/swagger';
import { CreateVacanciesCommand } from './create-vacancies.command';

export class CreateVacanciesRequest {
    @IsString()
    @MinLength(3)
    @ApiProperty({ required: false })
    title!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty({ required: false })
    address!: string;

    @IsString()
    @MinLength(10)
    @ApiProperty({ required: false })
    description!: string;

    @IsString()
    @MaxLength(16)
    @ApiProperty({ required: false })
    phoneNumber!: string;

    @IsEnum(VacancyType)
    @ApiProperty({ required: false })
    type!: VacancyType;

    @IsString()
    @MaxLength(64)
    @ApiProperty({ required: false })
    salary!: string;

    @IsBoolean()
    @Type(() => Boolean)
    @ApiProperty({ required: false })
    isActive!: boolean;


    public toCommand(): CreateVacanciesCommand {
        const cmd = new CreateVacanciesCommand();
        cmd.title = this.title;
        cmd.address = this.address;
        cmd.description = this.description;
        cmd.phoneNumber = this.phoneNumber;
        cmd.type = this.type;
        cmd.salary = this.salary;
        cmd.isActive = this.isActive;
        return cmd;
    }
}

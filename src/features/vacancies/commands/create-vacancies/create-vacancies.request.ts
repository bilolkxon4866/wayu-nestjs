import { IsBoolean, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { VacancyType } from '../../../../core/enum/enum';
import { ApiProperty } from '@nestjs/swagger';
import { CreateVacanciesCommand } from './create-vacancies.command';

export class CreateVacanciesRequest {
    @IsString()
    @MinLength(3)
    @ApiProperty()
    title!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    address!: string;

    @IsString()
    @MinLength(10)
    @ApiProperty()
    description!: string;

    @IsString()
    @MaxLength(16)
    @ApiProperty()
    phoneNumber!: string;

    @IsEnum(VacancyType)
    @ApiProperty()
    type!: VacancyType;

    @IsString()
    @MaxLength(64)
    @ApiProperty()
    salary!: string;

    @IsBoolean()
    @Type(() => Boolean)
    @ApiProperty()
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

import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { VacancyType } from '../../../../core/enum/enum';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateVacanciesCommand } from './update-vacancies.command';

export class UpdateVacanciesRequest {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @ApiProperty({ required: true })
    title?: string | undefined;

    @IsOptional()
    @IsString()
    @MaxLength(128)
    @ApiProperty({ required: true })
    address?: string | undefined;

    @IsOptional()
    @IsString()
    @MinLength(10)
    @ApiProperty({ required: true })
    description?: string | undefined;

    @IsOptional()
    @IsString()
    @MaxLength(16)
    @ApiProperty({ required: true })
    phoneNumber?: string | undefined;

    @IsOptional()
    @IsEnum(VacancyType)
    @ApiProperty({ required: true })
    type?: VacancyType | undefined;

    @IsOptional()
    @IsString()
    @MaxLength(64)
    @ApiProperty({ required: true })
    salary?: string | undefined;

    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    @ApiProperty({ required: true })
    isActive?: boolean | undefined;


    public toCommand(id: number): UpdateVacanciesCommand {
        const cmd = new UpdateVacanciesCommand();
        cmd.id = id;
        if (this.title !== undefined) cmd.title = this.title;
        if (this.address !== undefined) cmd.address = this.address;
        if (this.description !== undefined) cmd.description = this.description;
        if (this.phoneNumber !== undefined) cmd.phoneNumber = this.phoneNumber;
        if (this.type !== undefined) cmd.type = this.type;
        if (this.salary !== undefined) cmd.salary = this.salary;
        if (this.isActive !== undefined) cmd.isActive = this.isActive;
        return cmd;
    }
}

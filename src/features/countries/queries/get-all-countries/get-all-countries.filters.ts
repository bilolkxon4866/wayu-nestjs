import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetAllCountriesFilters {
    @IsInt()
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    @ApiProperty({ required: false })
    page?: number;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(100)
    @Type(() => Number)
    @ApiProperty({ required: false })
    size?: number;
}

import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetAllNewsCategoriesFilters {
    @IsInt()
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    @ApiProperty({ required: false })
    page?: number;

    @IsInt()
    @IsOptional()
    @Max(100)
    @Type(() => Number)
    @ApiProperty({ required: false })
    size?: number;
}

import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetAllFaqsFilters {
    @IsInt()
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    @ApiProperty({ required: false, example: 1 })
    page?: number;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(100)
    @Type(() => Number)
    @ApiProperty({ required: false, example: 10 })
    size?: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false, example: 'a\'zo', description: 'Savol boyicha qidirish' })
    search?: string;
}

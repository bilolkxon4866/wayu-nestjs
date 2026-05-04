import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetAllInstagramPostsFilters {
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
}

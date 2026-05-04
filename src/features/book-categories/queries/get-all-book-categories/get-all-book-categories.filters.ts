import { ApiProperty,  } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';
import {Type} from "class-transformer";

export class GetAllBookCategoriesFilters {
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({required: false})
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @ApiProperty({required: false})
    size?: number;
}

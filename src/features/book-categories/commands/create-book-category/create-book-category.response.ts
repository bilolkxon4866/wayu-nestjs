import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookCategoryResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    title!: string;

    @Expose()
    @ApiProperty()
    createdAt!: string;
}

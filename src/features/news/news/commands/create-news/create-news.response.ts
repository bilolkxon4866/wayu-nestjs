import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    title!: string;

    @Expose()
    @ApiProperty()
    image!: string;

    @Expose()
    @ApiProperty()
    date!: Date;

    @Expose()
    @ApiProperty()
    categoryId!: number;

    @Expose()
    @ApiProperty()
    createdAt!: string;
}

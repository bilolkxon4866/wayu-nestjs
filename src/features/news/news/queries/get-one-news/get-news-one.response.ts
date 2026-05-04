import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetNewsOneResponse {
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
    content!: string;

    @Expose()
    @ApiProperty()
    categoryId!: number;

    @Expose()
    @ApiProperty()
    createdAt!: string;

    @Expose()
    @ApiProperty()
    updateAt!: string;
}

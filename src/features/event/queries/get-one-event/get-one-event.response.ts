import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneEventResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    title!: string;

    @Expose()
    @ApiProperty()
    content!: string;

    @Expose()
    @ApiProperty()
    image!: string;

    @Expose()
    @ApiProperty()
    date!: string;

    @Expose()
    @ApiProperty()
    address!: string;

    @Expose()
    @ApiProperty()
    categoryId!: string;

    @Expose()
    @ApiProperty()
    createdAt!: string;

    @Expose()
    @ApiProperty()
    updateAt!: string;

}

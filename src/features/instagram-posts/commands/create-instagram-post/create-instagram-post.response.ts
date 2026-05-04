import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInstagramPostResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    image!: string;

    @Expose()
    @ApiProperty()
    link!: string;

    @Expose()
    @ApiProperty()
    createdAt!: string;
}

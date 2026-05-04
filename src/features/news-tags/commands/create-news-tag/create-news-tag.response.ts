import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsTagResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    newsId!: number;

    @Expose()
    @ApiProperty()
    tagId!: number;

    @Expose()
    @ApiProperty()
    createdAt!: string;
}

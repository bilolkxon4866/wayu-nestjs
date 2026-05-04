import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagResponse {
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

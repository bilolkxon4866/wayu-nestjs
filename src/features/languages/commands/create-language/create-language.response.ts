import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLanguageResponse {
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

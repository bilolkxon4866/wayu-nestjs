import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    question!: string;

    @Expose()
    @ApiProperty()
    answer!: string;

    @Expose()
    @ApiProperty()
    createdAt!: string;
}

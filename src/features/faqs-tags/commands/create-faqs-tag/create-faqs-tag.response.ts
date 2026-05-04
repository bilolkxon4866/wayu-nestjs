import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqsTagResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    faqsId!: number;

    @Expose()
    @ApiProperty()
    tagId!: number;

    @Expose()
    @ApiProperty()
    createdAt!: string;
}

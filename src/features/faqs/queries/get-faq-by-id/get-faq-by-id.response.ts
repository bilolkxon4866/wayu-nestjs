import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class TagShortResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    title!: string;
}

class FaqTagResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @Type(() => TagShortResponse)
    @ApiProperty({ type: TagShortResponse })
    tag!: TagShortResponse;
}

export class GetFaqByIdResponse {
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
    @Type(() => FaqTagResponse)
    @ApiProperty({ type: [FaqTagResponse] })
    faqsTags!: FaqTagResponse[];

    @Expose()
    @ApiProperty()
    createdAt!: string;

    @Expose()
    @ApiProperty()
    updateAt!: string;
}

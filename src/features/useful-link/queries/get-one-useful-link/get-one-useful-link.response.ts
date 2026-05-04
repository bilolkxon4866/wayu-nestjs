import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneUsefulLinkResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    title!: string;

    @Expose()
    @ApiProperty()
    icon!: string;

    @Expose()
    @ApiProperty()
    link!: string;

    @Expose()
    @ApiProperty()
    createdAt!: string;

    @Expose()
    @ApiProperty()
    updateAt!: string;

}

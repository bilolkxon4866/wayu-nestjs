import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneAuthorResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    fullName!: string;

    @Expose()
    @ApiProperty()
    createdAt!: string;

    @Expose()
    @ApiProperty()
    updateAt!: string;

}

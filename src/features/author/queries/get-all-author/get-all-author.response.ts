import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllAuthorResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    fullName!: string;

    @Expose()
    @ApiProperty()
    createdAt!: string;

}

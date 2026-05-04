import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorResponse {
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

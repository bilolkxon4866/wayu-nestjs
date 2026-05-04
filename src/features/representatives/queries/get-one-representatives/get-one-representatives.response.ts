import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneRepresentativesResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    fullname!: string;

    @Expose()
    @ApiProperty()
    image!: string;

    @Expose()
    @ApiProperty()
    email!: string;

    @Expose()
    @ApiProperty()
    phoneNumber!: string;

    @Expose()
    @ApiProperty()
    resume!: string;

    @Expose()
    @ApiProperty()
    createdAt!: string;

    @Expose()
    @ApiProperty()
    updateAt!: string;

}

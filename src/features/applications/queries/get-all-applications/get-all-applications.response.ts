import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllApplicationsResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    fullName!: string;

    @Expose()
    @ApiProperty()
    phoneNumber!: string;

    @Expose()
    @ApiProperty()
    email!: string;

    @Expose()
    @ApiProperty()
    vacancyId!: string;

    @Expose()
    @ApiProperty()
    resume!: string;

    @Expose()
    @ApiProperty()
    status!: string;

    @Expose()
    @ApiProperty()
    createdAt!: string;

}

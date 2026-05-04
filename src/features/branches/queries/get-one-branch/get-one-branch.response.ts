import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CountryShortResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    title!: string;

    @Expose()
    @ApiProperty()
    flag!: string;
}

class RepresentativeShortResponse {
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
    phoneNumber!: string;
}

export class GetBranchResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    city!: string;

    @Expose()
    @ApiProperty()
    latitude!: number;

    @Expose()
    @ApiProperty()
    longitude!: number;

    @Expose()
    @ApiProperty()
    phoneNumber!: string;

    @Expose()
    @Type(() => CountryShortResponse)
    @ApiProperty({ type: CountryShortResponse })
    country!: CountryShortResponse;

    @Expose()
    @Type(() => RepresentativeShortResponse)
    @ApiProperty({ type: RepresentativeShortResponse })
    representative!: RepresentativeShortResponse;

    @Expose()
    @ApiProperty()
    createdAt!: string;

    @Expose()
    @ApiProperty()
    updateAt!: string;
}
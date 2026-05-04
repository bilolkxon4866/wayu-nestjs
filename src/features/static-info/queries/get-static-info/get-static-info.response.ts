import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetStaticInfoResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty({ nullable: true })
    appStoreLink?: string;

    @Expose()
    @ApiProperty({ nullable: true })
    playMarketLink?: string;

    @Expose()
    @ApiProperty()
    aboutUs!: string;

    @Expose()
    @ApiProperty()
    createdAt!: string;

    @Expose()
    @ApiProperty()
    updateAt!: string;
}

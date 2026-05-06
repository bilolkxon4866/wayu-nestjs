import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class CreateLoginAdminResponse{
    @Expose()
    @ApiProperty()
    id!: number

    @Expose()
    @ApiProperty()
    userName!: string

    @Expose()
    @ApiProperty()
    password!: string

    @Expose()
    @ApiProperty()
    createdAt!: string

    @Expose()
    @ApiProperty()
    updatedAt?: string
}
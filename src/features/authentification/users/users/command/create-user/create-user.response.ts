import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../../../../../../core/enum/enum";

export class CreateUserResponse {
    @Expose()
    @ApiProperty()
    role!: Role

    @Expose()
    @ApiProperty()
    userName!: string

    @Expose()
    @ApiProperty()
    fullName!: string

    @Expose()
    @ApiProperty()
    password!: string

    @Expose()
    @ApiProperty()
    birthDate!: string

    @Expose()
    @ApiProperty()
    isVerified!: boolean

    @Expose()
    @ApiProperty()
    isActive!: boolean
}
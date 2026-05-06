import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsDateString, IsEnum, IsString, MaxLength} from "class-validator";
import {Role} from "../../../../../../core/enum/enum";

export class CreateUserRequest {
    @IsEnum(Role)
    @ApiProperty()
    role!: Role

    @IsString()
    @MaxLength(64)
    @ApiProperty()
    userName!: string

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    fullName!: string

    @IsString()
    @MaxLength(64)
    @ApiProperty()
    password!: string

    @IsDateString()
    @ApiProperty()
    birthDate!: string

    @IsBoolean()
    @ApiProperty()
    isVerified!: boolean

    @IsBoolean()
    @ApiProperty()
    isActive!: boolean
}
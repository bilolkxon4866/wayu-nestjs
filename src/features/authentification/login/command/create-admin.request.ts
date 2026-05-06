import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString, MaxLength} from "class-validator";

export class CreateLoginAdminRequest{
    @IsString()
    @ApiProperty()
    userName!: string

    @IsString()
    @MaxLength(64)
    @ApiProperty({default: 'davron9910'})
    password!: string
}
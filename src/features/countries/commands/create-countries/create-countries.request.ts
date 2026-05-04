import {IsString, IsUrl, Length, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {CreateCountriesCommand} from "./create-countries.command";

export class CreateCountriesRequest{
    @IsString()
    @Length(6, 64)
    @ApiProperty({required: false})
    title!: string

    @IsUrl()
    @MaxLength(64)
    @ApiProperty({required: false})
    flag!: string


    public toCommand(): CreateCountriesCommand{
        const cmd = new CreateCountriesCommand()
        cmd.title = this.title
        cmd.flag = this.flag
        return cmd
    }
}
import {Command} from "@nestjs/cqrs";
import {IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {CreateNewsCategoryResponse} from "./create-news-category.response";
import {CreateNewsCategoryCommand} from "./create-news-category.command";

export class CreateNewsCategoryRequest{
    @IsString()
    @MaxLength(64)
    @ApiProperty()
    title!: string

    public toCommand(): CreateNewsCategoryCommand {
        const cmd = new CreateNewsCategoryCommand();
        cmd.title = this.title;
        return cmd;
    }
}
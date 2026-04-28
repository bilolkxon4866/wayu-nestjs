import {Command} from "@nestjs/cqrs";
import {IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {CreateNewsCategoryResponse} from "./create-news-category.response";

export class CreateNewsCategoryCommand extends Command<CreateNewsCategoryResponse>{
    @IsString()
    @MaxLength(64)
    @ApiProperty()
    title!: string
}
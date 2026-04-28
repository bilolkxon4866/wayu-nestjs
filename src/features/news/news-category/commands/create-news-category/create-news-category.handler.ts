import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateNewsCategoryCommand} from "./create-news-category.command";
import {NewsCategoriesEntity} from "../../newsCategories.entity";
import {ILike} from "typeorm";
import {BadRequestException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {CreateNewsCategoryResponse} from "./create-news-category.response";

@CommandHandler(CreateNewsCategoryCommand)
export class CreateNewsCategoryHandler implements ICommandHandler<CreateNewsCategoryCommand>{

    async execute(command: CreateNewsCategoryCommand): Promise<CreateNewsCategoryResponse> {
        const alreadyExists = await NewsCategoriesEntity.existsBy({title: ILike(command.title)})
        if(alreadyExists)
            throw new BadRequestException("title is already taken")

        const newNewsCategory = NewsCategoriesEntity.create({title: command.title} as  NewsCategoriesEntity)
        await NewsCategoriesEntity.save(newNewsCategory)

        return plainToInstance(CreateNewsCategoryResponse, newNewsCategory, {excludeExtraneousValues: true})
    }
}
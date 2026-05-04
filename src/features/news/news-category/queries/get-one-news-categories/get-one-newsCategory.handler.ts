import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {NewsCategoriesEntity} from "../../newsCategories.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {GetOneNewsCategoryQuery} from "./get-one-newsCategory.query";
import {GetOneNewsCategoryResponse} from "./get-one-newsCategory.response";

@QueryHandler(GetOneNewsCategoryQuery)
export class GetOneNewsCategoryHandler implements IQueryHandler<GetOneNewsCategoryQuery>{
    async execute(query: GetOneNewsCategoryQuery): Promise<GetOneNewsCategoryResponse>{
        const newscategory = await NewsCategoriesEntity.findOne({where: {id: query.id}, relations: ['news']})

        if(!newscategory){
            throw new NotFoundException('Berilgan id boyicha yangilik topilmadi')
        }

        return plainToInstance(GetOneNewsCategoryResponse, newscategory, {excludeExtraneousValues: true})
    }
}
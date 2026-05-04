import {Query} from "@nestjs/cqrs";
import {GetOneNewsCategoryResponse} from "./get-one-newsCategory.response";

export class GetOneNewsCategoryQuery extends Query<GetOneNewsCategoryResponse>{
    constructor(public readonly id: number) {
        super();
    }
}
import { Query } from '@nestjs/cqrs';
import { GetOneBookCategoryResponse } from './get-one-book-category.response';

export class GetOneBookCategoryQuery extends Query<GetOneBookCategoryResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

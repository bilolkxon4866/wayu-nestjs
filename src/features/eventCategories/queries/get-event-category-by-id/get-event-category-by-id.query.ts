import { Query } from '@nestjs/cqrs';
import { GetEventCategoryByIdResponse } from './get-event-category-by-id.response';

export class GetEventCategoryByIdQuery extends Query<GetEventCategoryByIdResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

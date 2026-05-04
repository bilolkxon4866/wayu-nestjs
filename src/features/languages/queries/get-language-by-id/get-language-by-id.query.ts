import { Query } from '@nestjs/cqrs';
import { GetLanguageByIdResponse } from './get-language-by-id.response';

export class GetLanguageByIdQuery extends Query<GetLanguageByIdResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

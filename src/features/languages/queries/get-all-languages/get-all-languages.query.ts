import { Query } from '@nestjs/cqrs';
import { GetAllLanguagesFilters } from './get-all-languages.filters';
import { GetAllLanguagesResponse } from './get-all-languages.response';

export class GetAllLanguagesQuery extends Query<GetAllLanguagesResponse[]> {
    constructor(public readonly filters: GetAllLanguagesFilters) {
        super();
    }
}

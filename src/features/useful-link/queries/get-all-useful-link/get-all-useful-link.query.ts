import { Query } from '@nestjs/cqrs';
import { GetAllUsefulLinkFilters } from './get-all-useful-link.filters';
import { GetAllUsefulLinkResponse } from './get-all-useful-link.response';

export class GetAllUsefulLinkQuery extends Query<GetAllUsefulLinkResponse[]> {
    constructor(public readonly filters: GetAllUsefulLinkFilters) {
        super();
    }
}

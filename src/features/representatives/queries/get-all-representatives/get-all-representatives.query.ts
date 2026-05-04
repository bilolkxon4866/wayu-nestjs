import { Query } from '@nestjs/cqrs';
import { GetAllRepresentativesFilters } from './get-all-representatives.filters';
import { GetAllRepresentativesResponse } from './get-all-representatives.response';

export class GetAllRepresentativesQuery extends Query<GetAllRepresentativesResponse[]> {
    constructor(public readonly filters: GetAllRepresentativesFilters) {
        super();
    }
}

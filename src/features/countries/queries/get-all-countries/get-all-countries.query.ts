import { Query } from '@nestjs/cqrs';
import { GetAllCountriesFilters } from './get-all-countries.filters';
import { GetAllCountriesResponse } from './get-all-countries.response';

export class GetAllCountriesQuery extends Query<GetAllCountriesResponse[]> {
    constructor(public readonly filters: GetAllCountriesFilters) {
        super();
    }
}

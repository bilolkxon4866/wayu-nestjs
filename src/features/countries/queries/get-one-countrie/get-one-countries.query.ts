import { Query } from '@nestjs/cqrs';
import { GetOneCountriesResponse } from './get-one-countries.response';

export class GetOneCountriesQuery extends Query<GetOneCountriesResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

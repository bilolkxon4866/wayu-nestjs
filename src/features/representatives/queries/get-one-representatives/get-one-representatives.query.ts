import { Query } from '@nestjs/cqrs';
import { GetOneRepresentativesResponse } from './get-one-representatives.response';

export class GetOneRepresentativesQuery extends Query<GetOneRepresentativesResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

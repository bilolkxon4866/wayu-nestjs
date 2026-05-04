import { Query } from '@nestjs/cqrs';
import { GetOneApplicationsResponse } from './get-one-applications.response';

export class GetOneApplicationsQuery extends Query<GetOneApplicationsResponse> {
    constructor(public readonly id: number) {
        super();
    }
}

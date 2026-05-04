import { Query } from '@nestjs/cqrs';
import { GetAllApplicationsFilters } from './get-all-applications.filters';
import { GetAllApplicationsResponse } from './get-all-applications.response';

export class GetAllApplicationsQuery extends Query<GetAllApplicationsResponse[]> {
    constructor(public readonly filters: GetAllApplicationsFilters) {
        super();
    }
}

import { Query } from '@nestjs/cqrs';
import {GetAllBranchFilter} from "./get-all-branch.filter";
import {GetAllBranchResponse} from "./get-all-branch.response";


export class GetAllBranchQuery extends Query<GetAllBranchResponse[]> {
    constructor(public readonly filters: GetAllBranchFilter) {
        super();
    }
}
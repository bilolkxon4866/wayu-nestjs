import { Query } from '@nestjs/cqrs';
import {GetBranchResponse} from "./get-one-branch.response";

export class GetOneBranchQuery extends Query<GetBranchResponse> {
    constructor(public readonly id: number) {
        super();
    }
}
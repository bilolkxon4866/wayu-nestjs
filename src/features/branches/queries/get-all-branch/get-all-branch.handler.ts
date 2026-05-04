import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllBranchQuery } from './get-all-branch.query';
import { GetAllBranchResponse } from './get-all-branch.response';
import {BranchesEntity} from "../../branches.entity";

@QueryHandler(GetAllBranchQuery)
export class GetAllBranchHandler implements IQueryHandler<GetAllBranchQuery> {
    async execute(query: GetAllBranchQuery): Promise<GetAllBranchResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const where: Record<string, any> = {};
        if (query.filters.countryId) {
            where['country'] = { id: query.filters.countryId };
        }

        const branches = await BranchesEntity.find({
            where,
            skip,
            take,
            order: { createdAt: 'DESC' },
        });

        return plainToInstance(GetAllBranchResponse, branches, { excludeExtraneousValues: true });
    }
}
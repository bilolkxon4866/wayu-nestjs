import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {BranchesEntity} from "../../branches.entity";
import {GetBranchResponse} from "./get-one-branch.response";
import {GetOneBranchQuery} from "./get-one-branch.query";


@QueryHandler(GetOneBranchQuery)
export class GetBranchByIdHandler implements IQueryHandler<GetOneBranchQuery> {
    async execute(query: GetOneBranchQuery): Promise<GetBranchResponse> {
        const branch = await BranchesEntity.findOne({
            where: { id: query.id },
            relations: ['country', 'representative'],
        });

        if (!branch) {
            throw new NotFoundException('Berilgan id boyicha filial topilmadi');
        }

        return plainToInstance(GetBranchResponse, branch, { excludeExtraneousValues: true });
    }
}
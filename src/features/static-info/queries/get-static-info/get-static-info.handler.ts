import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetStaticInfoQuery } from './get-static-info.query';
import { GetStaticInfoResponse } from './get-static-info.response';
import {StaticInfoEntity} from "../../staticInfo.entity";

@QueryHandler(GetStaticInfoQuery)
export class GetStaticInfoHandler implements IQueryHandler<GetStaticInfoQuery> {
    async execute(): Promise<GetStaticInfoResponse> {
        const staticInfo = await StaticInfoEntity.findOne({ where: {} });
        if (!staticInfo) {
            throw new NotFoundException('Static info hali kiritilmagan');
        }

        return plainToInstance(GetStaticInfoResponse, staticInfo, { excludeExtraneousValues: true });
    }
}
